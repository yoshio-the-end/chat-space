require 'rails_helper'
#rails_helperを参照する定義

describe MessagesController do
  #  letで複数のexampleで同一のインスタンスを使える 
  #  letを利用してテスト中使用するインスタンスを定義
  #  初回呼び出し時のみ@groupと@userのインスタンスを生成した
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do
    context 'ログイン状態' do
      before do
        login user
        get :index, params: { group_id: group.id }
        #ここでlogin userメソッドを呼び出してログイン状態にした(マクロス)
      end
      #ここからend中にログイン状態のテストコードを記述
      it '@messageが未保存のMwssageクラスのインスタンスか？' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it '@groupとgroupが同一か？' do
        expect(assigns(:group)).to eq group
      end

      it 'インデックスが表示されるか' do
        expect(response).to render_template :index
      end
    end

    context 'ログインしていない状態' do
      before do
        get :index, params: { group_id: group.id }
      #login user を記述していないので非ログイン状態
      end
      #ここからend中にログインしていない状態のテストコードを記述

      it 'new_user_session_pathにリダイレクトするか？' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context 'log in' do
      before do
        login user
      end

      context 'can save' do
        subject {
          post :create,
          params: params
        }

        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)
        end

        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }

        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
        end

        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'not log in' do

      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
