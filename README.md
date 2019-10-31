# README

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|groupe_name|string|null: false, foreign_key: true|

### Association
- has_many :posts
- has_many :users, through: :groups_users

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false, foreign_key: true| add:index;
|email|string|null: false, foreign_key: true|
|passwords|string|null: false, foreign_key: true|

### Association
- has_many :groups, through: :groups_users
- has_many :posts

## postsテーブル

|Column|Type|Options|
|------|----|-------|
|text|string|null: false, foreign_key: true|
|image|string|null: false, foreign_key: true|
|group_id|null: false, foreign_key: true|
|user_id|null:false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
