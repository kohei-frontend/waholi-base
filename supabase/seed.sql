-- 既存データをクリア
DELETE FROM postworkplace;
DELETE FROM post;

-- ユーザーを作成
INSERT INTO users (id, nickname, age, gender, "planType", "createdAt", "updatedAt") VALUES
('user-1', 'testuser', 30, 'その他', 'free', NOW(), NOW());

-- postデータを作成
INSERT INTO post (id, "userId", "postType", state, lga, suburb, "createdAt", "updatedAt") VALUES
(1, 'user-1', 'Workplace', 'Victoria', 'Stonnington', 'Armadale', NOW(), NOW()),
(2, 'user-1', 'Workplace', 'New South Wales', 'Inner west', 'Townsville', NOW(), NOW()),
(3, 'user-1', 'Workplace', 'Queensland', 'Gold Coast', 'Gold Coast', NOW(), NOW());

-- postworkplaceデータを作成
INSERT INTO postworkplace ("postId", wage, atmosphere, "recommendationLevel", comment) VALUES
(1, 25.0, '{"Friendly","Professional"}', 4, 'Great place to work in Melbourne CBD.'),
(2, 22.5, '{"Relaxed","Collaborative"}', 5, 'Amazing work environment in Geelong.'),
(3, 20, '{"bad"}', 2, 'not really good.');

-- データ挿入完了メッセージ
SELECT 'Seed data inserted successfully.' AS message;