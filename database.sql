-- Create Database
CREATE DATABASE baby_mood;
CREATE USER baby_mood WITH ENCRYPTED PASSWORD 'baby_mood';
GRANT ALL PRIVILEGES ON DATABASE baby_mood TO baby_mood;
\connect baby_mood
CREATE SCHEMA baby_mood AUTHORIZATION baby_mood;
