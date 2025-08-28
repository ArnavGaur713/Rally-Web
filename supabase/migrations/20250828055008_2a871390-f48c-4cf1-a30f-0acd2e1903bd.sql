-- Insert dummy user for testing
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data, is_super_admin)
VALUES (
  'demo-user-id-12345',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'demo@rally.com',
  '$2a$10$YQjgAKUJDvK3WF8CyqB6me4tJZs9wCLKZVn4Nm6kUB6zZJL7LnCQ2', -- encrypted "demo123"
  NOW(),
  NOW(),
  NOW(),
  '{"full_name": "Demo User"}',
  false
);