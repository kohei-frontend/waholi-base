-- 既存データをクリア
DELETE FROM postworkplace;
DELETE FROM post;
DELETE FROM users;

-- users テーブルにデータを挿入
INSERT INTO users (id, nickname, age, gender, state, plan_type, profile_image, notification_settings, created_at, updated_at, deleted_at)
VALUES
  (1, 'User1', 25, '男性', 'vic', 'free', NULL, 'ON', NOW(), NOW(), NULL),
  (2, 'User2', 30, '女性', 'vic', 'premium', NULL, 'OFF', NOW(), NOW(), NULL),
  (3, 'User3', 28, 'その他', 'vic', 'free', NULL, 'ON', NOW(), NOW(), NULL),
  (4, 'User4', 40, '女性', 'act', 'free', NULL, 'OFF', NOW(), NOW(), NULL),
  (5, 'User5', 38, 'その他', 'vic', 'free', NULL, 'ON', NOW(), NOW(), NULL),
  (6, 'User6', 22, '男性', 'tas', 'free', NULL, 'OFF', NOW(), NOW(), NULL),
  (7, 'User7', 27, '女性', 'qld', 'free', NULL, 'ON', NOW(), NOW(), NULL),
  (8, 'User8', 31, '男性', 'nt', 'free', NULL, 'OFF', NOW(), NOW(), NULL),
  (9, 'User9', 29, 'その他', 'sa', 'free', NULL, 'ON', NOW(), NOW(), NULL),
  (10, 'User10', 26, '男性', 'nsw', 'free', NULL, 'OFF', NOW(), NOW(), NULL),
  (11, 'User11', 45, '女性', 'wa', 'free', NULL, 'ON', NOW(), NOW(), NULL),
  (12, 'User12', 33, '男性', 'vic', 'free', NULL, 'OFF', NOW(), NOW(), NULL),
  (13, 'User13', 21, '女性', 'act', 'free', NULL, 'ON', NOW(), NOW(), NULL),
  (14, 'User14', 37, 'その他', 'tas', 'free', NULL, 'OFF', NOW(), NOW(), NULL),
  (15, 'User15', 24, '男性', 'qld', 'free', NULL, 'ON', NOW(), NOW(), NULL),
  (16, 'User16', 50, '女性', 'nt', 'free', NULL, 'OFF', NOW(), NOW(), NULL),
  (17, 'User17', 42, '男性', 'sa', 'free', NULL, 'ON', NOW(), NOW(), NULL),
  (18, 'User18', 28, 'その他', 'wa', 'free', NULL, 'OFF', NOW(), NOW(), NULL),
  (19, 'User19', 39, '女性', 'nsw', 'free', NULL, 'ON', NOW(), NOW(), NULL),
  (20, 'User20', 32, '男性', 'vic', 'free', NULL, 'OFF', NOW(), NOW(), NULL);

-- tenant テーブルにデータを挿入
INSERT INTO tenant (id, name, created_at, updated_at)
VALUES
  (1, 'Tenant1', NOW(), NOW()),
  (2, 'Tenant2', NOW(), NOW()),
  (3, 'Tenant3', NOW(), NOW()),
  (20, 'Tenant20', NOW(), NOW());

-- userTenant テーブルにデータを挿入
INSERT INTO "userTenant" (id, user_id, tenant_id, is_default, created_at, updated_at)
VALUES
  (1, 1, 1, true, NOW(), NOW()),
  (2, 2, 2, false, NOW(), NOW()),
  (3, 3, 3, false, NOW(), NOW()),
  (20, 20, 20, true, NOW(), NOW());

-- location テーブルにデータを挿入
INSERT INTO location (id, name, state, lga, suburb, created_at, updated_at)
VALUES
  (1, 'Location1', 'Australian Capital Territory', 'Waverley', 'Eleebana', NOW(), NOW()),
  (2, 'Location2', 'New South Wales', 'Strathfield', 'Lyons', NOW(), NOW()),
  (3, 'Location3', 'Tasmania', 'Randwick', 'Lyons', NOW(), NOW()),
  (4, 'Location4', 'Western Australia', 'Monash', 'Oakbank', NOW(), NOW()),
  (5, 'Location5', 'Northern Territory', 'Woollahra', 'Wongulla', NOW(), NOW()),
  (6, 'Location6', 'South Australia', 'Coober Pedy', 'Towradgi', NOW(), NOW()),
  (7, 'Location7', 'Northern Territory', 'Coober Pedy', 'Townsville', NOW(), NOW()),
  (8, 'Location8', 'Northern Territory', 'Waverley', 'Tallwood', NOW(), NOW()),
  (9, 'Location9', 'Victoria', 'Inner west', 'Lyons', NOW(), NOW()),
  (10, 'Location10', 'Victoria', 'Strathfield', 'Oakbank', NOW(), NOW()),
  (11, 'Location11', 'South Australia', 'Gold Coast', 'Degilbo', NOW(), NOW()),
  (12, 'Location12', 'Western Australia', 'Woollahra', 'Ngunnawal', NOW(), NOW()),
  (13, 'Location13', 'South Australia', 'Stonnington', 'St Peters', NOW(), NOW()),
  (14, 'Location14', 'Northern Territory', 'Randwick', 'Closeburn', NOW(), NOW()),
  (15, 'Location15', 'Tasmania', 'Stonnington', 'Paynes Crossing', NOW(), NOW()),
  (16, 'Location16', 'South Australia', 'Randwick', 'Caroona', NOW(), NOW()),
  (17, 'Location17', 'New South Wales', 'Woollahra', 'Coolabah', NOW(), NOW()),
  (18, 'Location18', 'Northern Territory', 'Kalamunda', 'Coolabah', NOW(), NOW()),
  (19, 'Location19', 'Australian Capital Territory', 'Kalamunda', 'Oakbank', NOW(), NOW()),
  (20, 'Location20', 'Victoria', 'Randwick', 'Wongulla', NOW(), NOW()),
  (21, 'Location21', 'New South Wales', 'Strathfield', 'Maryland', NOW(), NOW()),
  (22, 'Location22', 'Australian Capital Territory', 'Woollahra', 'North Willoughby', NOW(), NOW()),
  (23, 'Location23', 'Tasmania', 'Randwick', 'Girvan', NOW(), NOW()),
  (24, 'Location24', 'New South Wales', 'Randwick', 'Paynes Crossing', NOW(), NOW()),
  (25, 'Location25', 'Northern Territory', 'Stonnington', 'Degilbo', NOW(), NOW()),
  (26, 'Location26', 'Northern Territory', 'Randwick', 'Townsville', NOW(), NOW()),
  (27, 'Location27', 'Australian Capital Territory', 'Monash', 'Anembo', NOW(), NOW()),
  (28, 'Location28', 'New South Wales', 'Waverley', 'Anembo', NOW(), NOW()),
  (29, 'Location29', 'Northern Territory', 'Inner west', 'Bonython', NOW(), NOW()),
  (30, 'Location30', 'Australian Capital Territory', 'Randwick', 'Roseberry', NOW(), NOW()),
  (100, 'Location100', 'Victoria', 'Monash', 'Paynes Crossing', NOW(), NOW());

-- Notification テーブルにデータを挿入
INSERT INTO notification (id, user_id, type, content, target_id, target_type, is_read, created_at, deleted_at)
VALUES
  (1, 1, 'comment', 'Content1', 'Target1', 'Post', false, NOW(), NULL),
  (2, 2, 'like', 'Content2', 'Target2', 'Comment', true, NOW(), NULL),
  (3, 3, 'comment', 'Content3', 'Target3', 'Post', false, NOW(), NULL),
  (20, 20, 'like', 'Content20', 'Target20', 'Comment', true, NOW(), NULL);

-- post テーブルにデータを挿入
INSERT INTO post (id, user_id, location_id, post_type, created_at, updated_at, deleted_at)
VALUES
  (1, 1, 9, 'Workplace', NOW(), NOW(), NULL),
  (2, 1, 17, 'Accommodation', NOW(), NOW(), NULL),
  (3, 1, 20, 'Accommodation', NOW(), NOW(), NULL),
  (4, 1, 7, 'Workplace', NOW(), NOW(), NULL),
  (5, 1, 13, 'Accommodation', NOW(), NOW(), NULL),
  (6, 1, 26, 'Accommodation', NOW(), NOW(), NULL),
  (7, 1, 15, 'Accommodation', NOW(), NOW(), NULL),
  (8, 1, 12, 'Accommodation', NOW(), NOW(), NULL),
  (9, 1, 4, 'Accommodation', NOW(), NOW(), NULL),
  (10, 1, 18, 'Accommodation', NOW(), NOW(), NULL),
  (11, 1, 3, 'Accommodation', NOW(), NOW(), NULL),
  (12, 1, 5, 'Accommodation', NOW(), NOW(), NULL),
  (13, 1, 25, 'Accommodation', NOW(), NOW(), NULL),
  (14, 1, 7, 'Workplace', NOW(), NOW(), NULL),
  (15, 1, 30, 'Accommodation', NOW(), NOW(), NULL),
  (16, 3, 22, 'Workplace', NOW(), NOW(), NULL),
  (17, 3, 5, 'Workplace', NOW(), NOW(), NULL),
  (18, 2, 24, 'Accommodation', NOW(), NOW(), NULL),
  (19, 2, 18, 'Workplace', NOW(), NOW(), NULL),
  (20, 3, 29, 'Workplace', NOW(), NOW(), NULL),
  (21, 3, 6, 'Workplace', NOW(), NOW(), NULL),
  (22, 2, 3, 'Accommodation', NOW(), NOW(), NULL),
  (23, 2, 19, 'Workplace', NOW(), NOW(), NULL),
  (24, 3, 23, 'Workplace', NOW(), NOW(), NULL),
  (25, 3, 6, 'Accommodation', NOW(), NOW(), NULL),
  (26, 2, 9, 'Accommodation', NOW(), NOW(), NULL),
  (27, 3, 15, 'Workplace', NOW(), NOW(), NULL),
  (28, 2, 12, 'Accommodation', NOW(), NOW(), NULL),
  (29, 2, 4, 'Workplace', NOW(), NOW(), NULL),
  (30, 3, 27, 'Accommodation', NOW(), NOW(), NULL),
  (31, 2, 23, 'Accommodation', NOW(), NOW(), NULL),
  (32, 3, 26, 'Accommodation', NOW(), NOW(), NULL),
  (33, 2, 25, 'Workplace', NOW(), NOW(), NULL),
  (34, 1, 12, 'Accommodation', NOW(), NOW(), NULL),
  (35, 1, 19, 'Accommodation', NOW(), NOW(), NULL),
  (36, 3, 8, 'Accommodation', NOW(), NOW(), NULL),
  (37, 3, 18, 'Workplace', NOW(), NOW(), NULL),
  (38, 2, 24, 'Accommodation', NOW(), NOW(), NULL),
  (39, 1, 25, 'Workplace', NOW(), NOW(), NULL),
  (40, 2, 6, 'Workplace', NOW(), NOW(), NULL),
  (41, 2, 26, 'Workplace', NOW(), NOW(), NULL),
  (42, 3, 14, 'Workplace', NOW(), NOW(), NULL),
  (43, 2, 1, 'Accommodation', NOW(), NOW(), NULL),
  (44, 2, 2, 'Workplace', NOW(), NOW(), NULL),
  (45, 3, 10, 'Workplace', NOW(), NOW(), NULL),
  (46, 2, 29, 'Workplace', NOW(), NOW(), NULL),
  (47, 1, 28, 'Workplace', NOW(), NOW(), NULL),
  (48, 3, 16, 'Workplace', NOW(), NOW(), NULL),
  (49, 3, 21, 'Workplace', NOW(), NOW(), NULL),
  (50, 3, 7, 'Workplace', NOW(), NOW(), NULL);

-- image テーブルにデータを挿入
INSERT INTO image (id, post_id, url, created_at)
VALUES
  (1, 20, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (2, 7, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (3, 17, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (4, 28, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (5, 12, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (6, 12, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (7, 21, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (8, 17, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (9, 17, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (10, 16, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (11, 16, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (12, 8, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (13, 10, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (14, 4, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (15, 29, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (16, 4, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (17, 10, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (18, 22, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (19, 23, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (20, 23, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (21, 17, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (22, 16, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (23, 22, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (24, 25, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (25, 11, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (26, 12, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (27, 25, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (28, 2, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (29, 13, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW()),
  (30, 6, 'http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg', NOW());

-- workplace テーブルにデータを挿入
INSERT INTO workplace (post_id, wage, atmosphere, rating, comment)
VALUES
  (7, 1300, ARRAY['Efficient', 'Innovative'], 5, 'Relaxing and fun atmosphere'),
  (5, 950, ARRAY['Casual', 'Casual'], 4, 'Nice coworkers and good management'),
  (3, 900, ARRAY['Supportive', 'Efficient'], 4, 'Challenging but fair'),
  (37, 1250, ARRAY['Challenging', 'Innovative'], 4, 'Supportive team'),
  (42, 1450, ARRAY['Casual', 'Dynamic'], 3, 'Good pay but high expectations'),
  (21, 1250, ARRAY['Professional', 'Friendly'], 4, 'Fast-paced but rewarding'),
  (38, 1250, ARRAY['Professional', 'Efficient'], 5, 'Good pay but high expectations'),
  (23, 1400, ARRAY['Dynamic', 'Professional'], 5, 'Good for beginners'),
  (46, 1450, ARRAY['Professional', 'Casual'], 5, 'Excellent environment'),
  (19, 1150, ARRAY['Supportive', 'Friendly'], 4, 'Challenging but fair'),
  (41, 1150, ARRAY['Relaxed', 'Efficient'], 3, 'Great place to work'),
  (28, 900, ARRAY['Innovative', 'Friendly'], 3, 'Relaxing and fun atmosphere'),
  (9, 1000, ARRAY['Efficient', 'Quiet'], 5, 'Challenging but fair'),
  (44, 1200, ARRAY['Quiet', 'Dynamic'], 4, 'Highly recommended'),
  (25, 1350, ARRAY['Casual', 'Relaxed'], 4, 'Fast-paced but rewarding'),
  (2, 1400, ARRAY['Casual', 'Casual'], 3, 'Good for beginners'),
  (50, 1050, ARRAY['Relaxed', 'Professional'], 5, 'Supportive team'),
  (27, 1450, ARRAY['Supportive', 'Relaxed'], 4, 'Relaxing and fun atmosphere'),
  (24, 1150, ARRAY['Quiet', 'Relaxed'], 5, 'Fast-paced but rewarding'),
  (33, 1250, ARRAY['Quiet', 'Challenging'], 4, 'Nice coworkers and good management'),
  (32, 900, ARRAY['Quiet', 'Efficient'], 4, 'Excellent environment'),
  (13, 1450, ARRAY['Innovative', 'Casual'], 3, 'Relaxing and fun atmosphere'),
  (12, 1100, ARRAY['Relaxed', 'Casual'], 4, 'Excellent environment'),
  (8, 1200, ARRAY['Friendly', 'Quiet'], 4, 'Challenging but fair'),
  (45, 1250, ARRAY['Dynamic', 'Professional'], 5, 'Good for beginners');


-- accommodation テーブルにデータを挿入
INSERT INTO accommodation (post_id, rent, setup, rating, comment)
VALUES
  (34, 50000, ARRAY['Single Room'], 4, 'Spacious and clean'),
  (47, 45000, ARRAY['Shared Room'], 5, 'Modern and well-maintained'),
  (29, 65000, ARRAY['Apartment'], 3, 'Comfortable and affordable'),
  (17, 60000, ARRAY['Dormitory'], 5, 'Good location'),
  (14, 45000, ARRAY['Studio'], 5, 'Spacious and clean'),
  (4, 60000, ARRAY['Single Room'], 3, 'Safe and secure'),
  (15, 65000, ARRAY['Studio'], 5, 'Highly recommended'),
  (48, 65000, ARRAY['Shared Room'], 4, 'Highly recommended'),
  (16, 45000, ARRAY['Dormitory'], 4, 'Safe and secure'),
  (1, 60000, ARRAY['Dormitory'], 3, 'Good location'),
  (20, 45000, ARRAY['Apartment'], 3, 'Great amenities'),
  (10, 60000, ARRAY['Studio'], 4, 'Safe and secure'),
  (31, 60000, ARRAY['Studio'], 3, 'Highly recommended'),
  (40, 50000, ARRAY['Studio'], 3, 'Modern and well-maintained'),
  (22, 50000, ARRAY['Dormitory'], 3, 'Modern and well-maintained'),
  (11, 50000, ARRAY['Dormitory'], 5, 'Highly recommended'),
  (30, 65000, ARRAY['Single Room'], 5, 'Spacious and clean'),
  (39, 50000, ARRAY['Apartment'], 5, 'Safe and secure'),
  (49, 50000, ARRAY['Shared Room'], 4, 'Modern and well-maintained'),
  (26, 65000, ARRAY['Dormitory'], 5, 'Spacious and clean'),
  (6, 50000, ARRAY['Shared Room'], 4, 'Nice and quiet'),
  (36, 55000, ARRAY['Dormitory'], 3, 'Spacious and clean'),
  (35, 50000, ARRAY['Dormitory'], 3, 'Affordable but basic'),
  (43, 55000, ARRAY['Dormitory'], 3, 'Close to public transport'),
  (18, 45000, ARRAY['Studio'], 4, 'Close to public transport');


-- comment テーブルにデータを挿入
INSERT INTO comment (id, user_id, post_id, content, created_at, updated_at, deleted_at, is_hidden)
VALUES
  (1, 1, 10, 'This was a good read.', NOW(), NOW(), NULL, TRUE),
  (2, 1, 1, 'This was insightful.', NOW(), NOW(), NULL, TRUE),
  (3, 1, 15, 'Well explained.', NOW(), NOW(), NULL, TRUE),
  (4, 1, 26, 'Very informative.', NOW(), NOW(), NULL, TRUE),
  (5, 1, 6, 'Would like more examples.', NOW(), NOW(), NULL, TRUE),
  (6, 1, 23, 'I like this perspective.', NOW(), NOW(), NULL, TRUE),
  (7, 1, 29, 'I totally agree!', NOW(), NOW(), NULL, FALSE),
  (8, 1, 25, 'Well thought out!', NOW(), NOW(), NULL, FALSE),
  (9, 1, 10, 'Would like more examples.', NOW(), NOW(), NULL, FALSE),
  (10, 1, 1, 'I have a different opinion.', NOW(), NOW(), NULL, FALSE),
  (11, 1, 25, 'I totally agree!', NOW(), NOW(), NULL, FALSE),
  (12, 1, 15, 'Well thought out!', NOW(), NOW(), NULL, FALSE),
  (13, 1, 13, 'I have a different opinion.', NOW(), NOW(), NULL, FALSE),
  (14, 1, 26, 'Could be improved.', NOW(), NOW(), NULL, FALSE),
  (15, 1, 10, 'Great post!', NOW(), NOW(), NULL, FALSE),
  (16, 2, 1, 'Fantastic explanation.', NOW(), NOW(), NULL, FALSE),
  (17, 2, 6, 'Interesting read.', NOW(), NOW(), NULL, FALSE),
  (18, 2, 2, 'Needs more evidence.', NOW(), NOW(), NULL, FALSE),
  (19, 3, 10, 'Well thought out!', NOW(), NOW(), NULL, FALSE),
  (20, 3, 10, 'Thanks for the clarification.', NOW(), NOW(), NULL, FALSE),
  (21, 3, 19, 'I learned something new.', NOW(), NOW(), NULL, FALSE),
  (22, 3, 24, 'Loved it!', NOW(), NOW(), NULL, FALSE),
  (23, 2, 26, 'Very informative.', NOW(), NOW(), NULL, FALSE),
  (24, 2, 26, 'Could be improved.', NOW(), NOW(), NULL, FALSE),
  (25, 2, 1, 'Needs more evidence.', NOW(), NOW(), NULL, TRUE),
  (26, 3, 11, 'Not convinced.', NOW(), NOW(), NULL, TRUE),
  (27, 2, 23, 'Well thought out!', NOW(), NOW(), NULL, TRUE),
  (28, 2, 10, 'Great post!', NOW(), NOW(), NULL, TRUE),
  (29, 3, 21, 'Well written!', NOW(), NOW(), NULL, TRUE),
  (30, 3, 16, 'I learned something new.', NOW(), NOW(), NULL, FALSE);

  -- commentVote テーブルにデータを挿入
INSERT INTO "commentVote" (id, user_id, comment_id, vote_type, created_at)
VALUES
  (1, 1, 2, 'upvote', NOW()),
  (2, 1, 3, 'downvote', NOW()),
  (3, 1, 4, 'downvote', NOW()),
  (4, 2, 6, 'upvote', NOW());

-- adminNotification テーブルにデータを挿入
INSERT INTO "adminNotification" (id, comment_id, message, notified_at)
VALUES
  (1, 1, 'This comment received too many downvotes and was hidden.', NOW()),
  (2, 2, 'This comment received too many downvotes and was hidden.', NOW());


-- like テーブルにデータを挿入
INSERT INTO "like" (id, user_id, post_id, created_at, deleted_at)
VALUES
  (1, '1', 13, NOW(), NULL),
  (2, '1', 12, NOW(), NULL),
  (3, '1', 4, NOW(), NULL),
  (4, '1', 2, NOW(), NULL),
  (5, '1', 14, NOW(), NULL),
  (6, '1', 7, NOW(), NULL),
  (7, '1', 29, NOW(), NULL),
  (8, '1', 22, NOW(), NULL),
  (9, '1', 26, NOW(), NULL),
  (10, '1', 19, NOW(), NULL),
  (11, '1', 20, NOW(), NULL),
  (14, '1', 9, NOW(), NULL),
  (16, '3', 21, NOW(), NULL),
  (17, '3', 7, NOW(), NULL),
  (18, '3', 25, NOW(), NULL),
  (19, '3', 20, NOW(), NULL),
  (20, '3', 5, NOW(), NULL),
  (21, '2', 22, NOW(), NULL),
  (22, '2', 30, NOW(), NULL),
  (23, '3', 27, NOW(), NULL),
  (24, '2', 5, NOW(), NULL),
  (26, '3', 17, NOW(), NULL),
  (27, '3', 26, NOW(), NULL),
  (29, '2', 3, NOW(), NULL),
  (30, '3', 16, NOW(), NULL);

  -- データ挿入完了メッセージ
SELECT 'Seed data inserted successfully.' AS message;

-- ーーーーーーーーーーーーーーー
-- -- ユーザーを作成
-- INSERT INTO users (id, nickname, age, gender, state, planType, profile_image, notification_settings, createdAt, updatedAt)
-- VALUES
-- ('user-1', 'testuser', 25, '男性', 'Tokyo', 'free', NULL, 'ON', NOW(), NOW()),
-- (2, 'User2', 30, '女性', 'Osaka', 'free', NULL, 'OFF', NOW(), NOW()),
-- (3, 'User3', 28, 'その他', 'Hokkaido', 'free', NULL, 'ON', NOW(), NOW()),
-- (20, 'User20', 32, '男性', 'Kyoto', 'free', NULL, 'OFF', NOW(), NOW());

-- -- location テーブルにデータを挿入
-- INSERT INTO location (id, name, state, lga, suburb, createdAt, updatedAt)
-- VALUES
--   (1, 'Location1', 'Tokyo', 'LGA1', 'Suburb1', NOW(), NOW()),
--   (2, 'Location2', 'Osaka', 'LGA2', 'Suburb2', NOW(), NOW()),
--   (3, 'Location3', 'Hokkaido', 'LGA3', 'Suburb3', NOW(), NOW()),
--   -- ... 17 more entries ...
--   (20, 'Location20', 'Kyoto', 'LGA20', 'Suburb20', NOW(), NOW());

-- -- Notification テーブルにデータを挿入
-- INSERT INTO Notification (id, userId, type, content, targetId, targetType, isRead, createdAt)
-- VALUES
--   (1, 1, 'comment', 'Content1', 'Target1', 'Post', false, NOW()),
--   (2, 2, 'like', 'Content2', 'Target2', 'Comment', true, NOW()),
--   (3, 3, 'comment', 'Content3', 'Target3', 'Post', false, NOW()),
--   -- ... 17 more entries ...
--   (20, 20, 'like', 'Content20', 'Target20', 'Comment', true, NOW());

-- -- postデータを作成
-- INSERT INTO post (id, "userId", "postType", state, lga, suburb, "createdAt", "updatedAt") VALUES
-- (1, 'user-1', 'Workplace', 'Victoria', 'Stonnington', 'Armadale', NOW(), NOW()),
-- (2, 'user-1', 'Workplace', 'New South Wales', 'Inner west', 'Townsville', NOW(), NOW()),
-- (3, 'user-1', 'Workplace', 'Queensland', 'Gold Coast', 'Gold Coast', NOW(), NOW()),
-- (4, 'user-1', 'Workplace', 'New South Wales', 'Woollahra', 'Macquarie', NOW(), NOW()),
-- (5, 'user-1', 'Workplace', 'New South Wales', 'Waverley', 'Braddon', NOW(), NOW()),
-- (6, 'user-1', 'Workplace', 'New South Wales', 'Randwick', 'Lyons', NOW(), NOW()),
-- (7, 'user-1', 'Workplace', 'New South Wales', 'Strathfield', 'Bonython', NOW(), NOW()),
-- (8, 'user-1', 'Workplace', 'New South Wales', 'Monash', 'Ngunnawal', NOW(), NOW()),
-- (9, 'user-1', 'Workplace', 'New South Wales', 'Kalamunda', 'Roseberry', NOW(), NOW()),
-- (10, 'user-1', 'Workplace', 'New South Wales', 'Coober Pedy', 'Westdale', NOW(), NOW()),
-- (11, 'user-1', 'Workplace', 'New South Wales', 'Woollahra', 'Tallwood', NOW(), NOW()),
-- (12, 'user-1', 'Workplace', 'New South Wales', 'Waverley', 'Paynes Crossing', NOW(), NOW()),
-- (13, 'user-1', 'Workplace', 'New South Wales', 'Randwick', 'Anembo', NOW(), NOW()),
-- (14, 'user-1', 'Workplace', 'New South Wales', 'Strathfield', 'North Willoughby', NOW(), NOW()),
-- (15, 'user-1', 'Workplace', 'New South Wales', 'Monash', 'Cranebrook', NOW(), NOW()),
-- (16, 'user-1', 'Workplace', 'New South Wales', 'Kalamunda', 'Girvan', NOW(), NOW()),
-- (17, 'user-1', 'Workplace', 'New South Wales', 'Coober Pedy', 'Caroona', NOW(), NOW()),
-- (18, 'user-1', 'Workplace', 'New South Wales', 'Woollahra', 'Towradgi', NOW(), NOW()),
-- (19, 'user-1', 'Workplace', 'New South Wales', 'Waverley', 'Coolabah', NOW(), NOW()),
-- (20, 'user-1', 'Workplace', 'New South Wales', 'Randwick', 'Maryland', NOW(), NOW()),
-- (21, 'user-1', 'Workplace', 'New South Wales', 'Strathfield', 'Eleebana', NOW(), NOW()),
-- (22, 'user-1', 'Workplace', 'New South Wales', 'Monash', 'Koolewong', NOW(), NOW()),
-- (23, 'user-1', 'Workplace', 'New South Wales', 'Kalamunda', 'Kilgra', NOW(), NOW()),
-- (24, 'user-1', 'Workplace', 'New South Wales', 'Coober Pedy', 'Sommariva', NOW(), NOW()),
-- (25, 'user-1', 'Workplace', 'New South Wales', 'Woollahra', 'Goomeribong', NOW(), NOW()),
-- (26, 'user-1', 'Workplace', 'New South Wales', 'Waverley', 'Closeburn', NOW(), NOW()),
-- (27, 'user-1', 'Workplace', 'New South Wales', 'Randwick', 'Degilbo', NOW(), NOW()),
-- (28, 'user-1', 'Workplace', 'New South Wales', 'Strathfield', 'Wongulla', NOW(), NOW()),
-- (29, 'user-1', 'Workplace', 'New South Wales', 'Monash', 'St Peters', NOW(), NOW()),
-- (30, 'user-1', 'Workplace', 'New South Wales', 'Kalamunda', 'Addison', NOW(), NOW()),
-- (31, 'user-1', 'Workplace', 'New South Wales', 'Coober Pedy', 'Manningham', NOW(), NOW()),
-- (32, 'user-1', 'Workplace', 'New South Wales', 'Woollahra', 'Oakbank', NOW(), NOW()),
-- (33, 'user-1', 'Workplace', 'New South Wales', 'Waverley', 'Magarey', NOW(), NOW()),
-- (34, 'user-1', 'Workplace', 'New South Wales', 'Randwick', 'Macgregor', NOW(), NOW()),
-- (35, 'user-1', 'Workplace', 'New South Wales', 'Strathfield', 'Braddon', NOW(), NOW()),
-- (36, 'user-1', 'Workplace', 'New South Wales', 'Monash', 'Lyons', NOW(), NOW()),
-- (37, 'user-1', 'Workplace', 'New South Wales', 'Kalamunda', 'Bonython', NOW(), NOW()),
-- (38, 'user-1', 'Workplace', 'New South Wales', 'Coober Pedy', 'Ngunnawal', NOW(), NOW()),
-- (39, 'user-1', 'Workplace', 'New South Wales', 'Woollahra', 'Roseberry', NOW(), NOW()),
-- (40, 'user-1', 'Workplace', 'New South Wales', 'Waverley', 'Westdale', NOW(), NOW()),
-- (41, 'user-1', 'Workplace', 'New South Wales', 'Randwick', 'Tallwood', NOW(), NOW()),
-- (42, 'user-1', 'Workplace', 'New South Wales', 'Strathfield', 'Paynes Crossing', NOW(), NOW()),
-- (43, 'user-1', 'Workplace', 'New South Wales', 'Monash', 'Anembo', NOW(), NOW()),
-- (44, 'user-1', 'Workplace', 'New South Wales', 'Kalamunda', 'North Willoughby', NOW(), NOW()),
-- (45, 'user-1', 'Workplace', 'New South Wales', 'Coober Pedy', 'Cranebrook', NOW(), NOW()),
-- (46, 'user-1', 'Workplace', 'New South Wales', 'Woollahra', 'Girvan', NOW(), NOW()),
-- (47, 'user-1', 'Workplace', 'New South Wales', 'Waverley', 'Caroona', NOW(), NOW()),
-- (48, 'user-1', 'Workplace', 'New South Wales', 'Randwick', 'Towradgi', NOW(), NOW()),
-- (49, 'user-1', 'Workplace', 'New South Wales', 'Strathfield', 'Coolabah', NOW(), NOW()),
-- (50, 'user-1', 'Workplace', 'New South Wales', 'Monash', 'Maryland', NOW(), NOW()),
-- -- 他のstateに少ないレコードを割り当て
-- (51, 'user-1', 'Workplace', 'Victoria', 'Vincent', 'Eleebana', NOW(), NOW()),
-- (52, 'user-1', 'Workplace', 'Queensland', 'Walkerville', 'Koolewong', NOW(), NOW()),
-- (53, 'user-1', 'Workplace', 'South Australia', 'Monash', 'Kilgra', NOW(), NOW()),
-- (54, 'user-1', 'Workplace', 'Western Australia', 'Randwick', 'Sommariva', NOW(), NOW()),
-- (55, 'user-1', 'Workplace', 'Tasmania', 'Kalamunda', 'Goomeribong', NOW(), NOW()),
-- (56, 'user-1', 'Workplace', 'Northern Territory', 'Coober Pedy', 'Closeburn', NOW(), NOW()),
-- (57, 'user-1', 'Workplace', 'Australian Capital Territory', 'Woollahra', 'Degilbo', NOW(), NOW()),
-- (58, 'user-1', 'Workplace', 'Victoria', 'Waverley', 'Wongulla', NOW(), NOW()),
-- (59, 'user-1', 'Workplace', 'Queensland', 'Whitehorse', 'St Peters', NOW(), NOW()),
-- (60, 'user-1', 'Workplace', 'South Australia', 'Prospect', 'Addison', NOW(), NOW()),
-- (61, 'user-1', 'Workplace', 'Western Australia', 'Strathfield', 'Manningham', NOW(), NOW()),
-- (62, 'user-1', 'Workplace', 'Tasmania', 'Vincent', 'Oakbank', NOW(), NOW()),
-- (63, 'user-1', 'Workplace', 'Northern Territory', 'Walkerville', 'Magarey', NOW(), NOW()),
-- (64, 'user-1', 'Workplace', 'Australian Capital Territory', 'Monash', 'Macquarie', NOW(), NOW()),
-- (65, 'user-1', 'Workplace', 'Victoria', 'Randwick', 'Macgregor', NOW(), NOW()),
-- (66, 'user-1', 'Workplace', 'Queensland', 'Kalamunda', 'Braddon', NOW(), NOW()),
-- (67, 'user-1', 'Workplace', 'South Australia', 'Coober Pedy', 'Lyons', NOW(), NOW()),
-- (68, 'user-1', 'Workplace', 'Western Australia', 'Woollahra', 'Bonython', NOW(), NOW()),
-- (69, 'user-1', 'Workplace', 'Tasmania', 'Waverley', 'Ngunnawal', NOW(), NOW()),
-- (70, 'user-1', 'Workplace', 'Northern Territory', 'Whitehorse', 'Roseberry', NOW(), NOW()),
-- (71, 'user-1', 'Workplace', 'Australian Capital Territory', 'Prospect', 'Westdale', NOW(), NOW()),
-- (72, 'user-1', 'Workplace', 'Victoria', 'Strathfield', 'Tallwood', NOW(), NOW()),
-- (73, 'user-1', 'Workplace', 'Queensland', 'Vincent', 'Paynes Crossing', NOW(), NOW()),
-- (74, 'user-1', 'Workplace', 'South Australia', 'Walkerville', 'Anembo', NOW(), NOW()),
-- (75, 'user-1', 'Workplace', 'Western Australia', 'Monash', 'North Willoughby', NOW(), NOW()),
-- (76, 'user-1', 'Workplace', 'Tasmania', 'Randwick', 'Cranebrook', NOW(), NOW()),
-- (77, 'user-1', 'Workplace', 'Northern Territory', 'Kalamunda', 'Girvan', NOW(), NOW()),
-- (78, 'user-1', 'Workplace', 'Australian Capital Territory', 'Coober Pedy', 'Caroona', NOW(), NOW()),
-- (79, 'user-1', 'Workplace', 'Victoria', 'Woollahra', 'Towradgi', NOW(), NOW()),
-- (80, 'user-1', 'Workplace', 'Queensland', 'Waverley', 'Coolabah', NOW(), NOW()),
-- (81, 'user-1', 'Workplace', 'South Australia', 'Whitehorse', 'Maryland', NOW(), NOW()),
-- (82, 'user-1', 'Workplace', 'Western Australia', 'Prospect', 'Eleebana', NOW(), NOW()),
-- (83, 'user-1', 'Workplace', 'Tasmania', 'Strathfield', 'Koolewong', NOW(), NOW()),
-- (84, 'user-1', 'Workplace', 'Northern Territory', 'Vincent', 'Kilgra', NOW(), NOW()),
-- (85, 'user-1', 'Workplace', 'Australian Capital Territory', 'Walkerville', 'Sommariva', NOW(), NOW()),
-- (86, 'user-1', 'Workplace', 'Victoria', 'Monash', 'Goomeribong', NOW(), NOW()),
-- (87, 'user-1', 'Workplace', 'Queensland', 'Randwick', 'Closeburn', NOW(), NOW()),
-- (88, 'user-1', 'Workplace', 'South Australia', 'Kalamunda', 'Degilbo', NOW(), NOW()),
-- (89, 'user-1', 'Workplace', 'Western Australia', 'Coober Pedy', 'Wongulla', NOW(), NOW()),
-- (90, 'user-1', 'Workplace', 'Tasmania', 'Woollahra', 'St Peters', NOW(), NOW()),
-- (91, 'user-1', 'Workplace', 'Northern Territory', 'Waverley', 'Addison', NOW(), NOW()),
-- (92, 'user-1', 'Workplace', 'Australian Capital Territory', 'Whitehorse', 'Manningham', NOW(), NOW()),
-- (93, 'user-1', 'Workplace', 'Victoria', 'Prospect', 'Oakbank', NOW(), NOW()),
-- (94, 'user-1', 'Workplace', 'Queensland', 'Strathfield', 'Magarey', NOW(), NOW()),
-- (95, 'user-1', 'Workplace', 'South Australia', 'Vincent', 'Macquarie', NOW(), NOW()),
-- (96, 'user-1', 'Workplace', 'Western Australia', 'Walkerville', 'Macgregor', NOW(), NOW()),
-- (97, 'user-1', 'Workplace', 'Tasmania', 'Monash', 'Braddon', NOW(), NOW()),
-- (98, 'user-1', 'Workplace', 'Northern Territory', 'Randwick', 'Lyons', NOW(), NOW()),
-- (99, 'user-1', 'Workplace', 'Australian Capital Territory', 'Kalamunda', 'Bonython', NOW(), NOW()),
-- (100, 'user-1', 'Workplace', 'Victoria', 'Coober Pedy', 'Ngunnawal', NOW(), NOW());

-- INSERT INTO postworkplace ("postId", wage, atmosphere, "recommendationLevel", comment, urls) VALUES
-- (1, 25.0, '{"Friendly","Professional"}', 4, 'Great place to work in Melbourne CBD.', '{"http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg", "http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/2.jpeg"}'),
-- (2, 22.5, '{"Relaxed","Collaborative"}', 5, 'Amazing work environment in Geelong.', '{"http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg", "http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/2.jpeg"}'),
-- (3, 20, '{"bad"}', 2, 'not really good.', '{"http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg"}'),
-- (4, 23.0, '{"Dynamic","Innovative"}', 3, 'Good place with some challenges.', '{"http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg"}'),
-- (5, 24.5, '{"Supportive","Friendly"}', 4, 'Nice team and environment.', '{"http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg", "http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/2.jpeg"}'),
-- (6, 21.0, '{"Relaxed","Casual"}', 3, 'Decent work-life balance.', '{"http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg", "http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/2.jpeg"}'),
-- (7, 26.0, '{"Professional","Efficient"}', 5, 'Highly recommend for career growth.', '{"http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg", "http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/2.jpeg"}'),
-- (8, 22.0, '{"Collaborative","Friendly"}', 4, 'Great team spirit.', '{"http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg", "http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/2.jpeg"}'),
-- (9, 23.5, '{"Innovative","Dynamic"}', 3, 'Challenging but rewarding.', '{"http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg"}'),
-- (10, 24.0, '{"Friendly","Supportive"}', 4, 'Supportive management.', '{"http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg", "http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/2.jpeg"}'),
-- (11, 24.0, '{"Casual"}', 3, 'Supportive management.', '{"http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg", "http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/2.jpeg"}'),
-- (12, 23.0, '{"Collaborative"}', 3, 'Great team spirit.', '{"http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg", "http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/2.jpeg"}'),
-- (100, 25.0, '{"Professional","Efficient"}', 5, 'Excellent place to work.', '{"http://127.0.0.1:54321/storage/v1/object/public/waholi-base/post-images/workplace/1.jpeg"}');

-- -- tenant テーブルにデータを挿入
-- INSERT INTO tenant (id, name, createdAt, updatedAt)
-- VALUES
--   (1, 'Tenant1', NOW(), NOW()),
--   (2, 'Tenant2', NOW(), NOW()),
--   (3, 'Tenant3', NOW(), NOW()),
--   -- ... 17 more entries ...
--   (20, 'Tenant20', NOW(), NOW());

-- -- usertenant テーブルにデータを挿入
-- INSERT INTO usertenant (id, userId, tenantId, isDefault, createdAt, updatedAt)
-- VALUES
--   (1, 1, 1, true, NOW(), NOW()),
--   (2, 2, 2, false, NOW(), NOW()),
--   (3, 3, 3, false, NOW(), NOW()),
--   -- ... 17 more entries ...
--   (20, 20, 20, true, NOW(), NOW());

