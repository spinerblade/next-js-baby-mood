-- Create Database
CREATE DATABASE baby_mood;

CREATE USER baby_mood
WITH
  encrypted password 'baby_mood';

GRANT ALL privileges ON database baby_mood TO baby_mood;

-- \connect baby_mood
CREATE SCHEMA baby_mood AUTHORIZATION baby_mood;

-- Connect to Database
-- psql -U baby_mood baby_mood
