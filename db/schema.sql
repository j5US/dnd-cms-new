-- Create campaigns table for storing page builder designs
CREATE TABLE IF NOT EXISTS campaigns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries on updated_at
CREATE INDEX IF NOT EXISTS idx_campaigns_updated_at ON campaigns(updated_at DESC);

-- Create index for faster name searches
CREATE INDEX IF NOT EXISTS idx_campaigns_name ON campaigns(name);
