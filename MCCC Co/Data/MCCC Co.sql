USE [master]
GO

IF db_id('MCCC Co') IS NULL
  CREATE DATABASE [MCCC Co]
GO

USE [MCCC Co]
GO

DROP TABLE IF EXISTS [OrderItem];
DROP TABLE IF EXISTS [UserItemReview];
DROP TABLE IF EXISTS [UserItemFavorite];
DROP TABLE IF EXISTS [UserPayment];
DROP TABLE IF EXISTS [UserAddress];
DROP TABLE IF EXISTS [PackItem];
DROP TABLE IF EXISTS [SeriesApplication];
DROP TABLE IF EXISTS [Distributor];
DROP TABLE IF EXISTS [Order];
DROP TABLE IF EXISTS [Application];
DROP TABLE IF EXISTS [Pack];
DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Item];
DROP TABLE IF EXISTS [Type];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [Series];

CREATE TABLE [User] (
  [Id] int PRIMARY KEY identity,
  [FirebaseId] nvarchar(255) not null,
  [IsAdmin] bit not null,
  [Name] nvarchar(255) not null,
  [Email] nvarchar(255) not null,
  [RewardsPoints] int
)
GO

CREATE TABLE [UserPayment] (
  [Id] int PRIMARY KEY identity,
  [UserId] int not null,
  [CardNumber] int not null,
  [IsDefault] bit
)
GO

CREATE TABLE [UserAddress] (
  [Id] int PRIMARY KEY identity,
  [UserId] int not null,
  [Type] nvarchar(255),
  [NickName] nvarchar(255),
  [CompanyName] nvarchar(255),
  [LineOne] nvarchar(255) not null,
  [LineTwo] nvarchar(255),
  [City] nvarchar(255) not null,
  [State] nvarchar(255) not null,
  [ZIPCode] nvarchar(255) not null,
  [Country] nvarchar(255) not null,
  [IsDefault] bit
)
GO

CREATE TABLE [UserItemReview] (
  [Id] int PRIMARY KEY identity,
  [UserId] int not null,
  [ItemId] int not null,
  [Rating] int not null,
  [Comment] nvarchar(255)
)
GO

CREATE TABLE [UserItemFavorite] (
  [Id] int PRIMARY KEY identity,
  [UserId] int not null,
  [ItemId] int not null
)
GO

CREATE TABLE [Series] (
  [Id] int PRIMARY KEY identity,
  [Name] nvarchar(255) not null,
  [Alloy] nvarchar(255),
  [BrightnessLevel] int,
  [Description] nvarchar(255),
  [Image] nvarchar(255)
)
GO

CREATE TABLE [SeriesApplication] (
  [Id] int PRIMARY KEY identity,
  [SeriesId] int not null,
  [ApplicationId] int not null
)
GO

CREATE TABLE [Application] (
  [Id] int PRIMARY KEY identity,
  [Case] nvarchar(255) not null
)
GO

CREATE TABLE [Category] (
  [Id] int PRIMARY KEY identity,
  [Name] nvarchar(255) not null,
  [Image] nvarchar(255)
)
GO

CREATE TABLE [Type] (
  [Id] int PRIMARY KEY identity,
  [CategoryId] int not null,
  [Name] nvarchar(255) not null,
  [Image] nvarchar(255)
)
GO

CREATE TABLE [Item] (
  [Id] int PRIMARY KEY identity,
  [TypeId] int not null,
  [SeriesId] int,
  [Height] int,
  [Width] int,
  [Depth] int,
  [Description] nvarchar(255),
  [Price] float not null,
  [Image] nvarchar(255),
  [PurchaseCount] int
)
GO

CREATE TABLE [PackItem] (
  [Id] int PRIMARY KEY identity,
  [PackId] int not null,
  [ItemId] int not null
)
GO

CREATE TABLE [Pack] (
  [Id] int PRIMARY KEY identity,
  [Name] nvarchar(255) not null,
  [Description] nvarchar(255),
  [Price] float not null,
  [PurchaseCount] int
)
GO

CREATE TABLE [OrderItem] (
  [Id] int PRIMARY KEY identity,
  [OrderId] int not null,
  [ItemId] int not null
)
GO

CREATE TABLE [Order] (
  [Id] int PRIMARY KEY identity,
  [UserId] int not null,
  [PaymentId] int,
  [BillingAddressId] int,
  [ShippingAddressId] int,
  [DateCreated] datetime not null,
  [DateCompleted] datetime,
  [RewardsUsed] int,
  [TotalValue] float,
  [TotalPaid] float,
  [ConfirmationNumber] nvarchar(255)
)
GO

CREATE TABLE [Distributor] (
  [Id] int PRIMARY KEY identity,
  [Name] nvarchar(255) not null,
  [AddressLineOne] nvarchar(255),
  [AddressLineTwo] nvarchar(255),
  [City] nvarchar(255),
  [State] nvarchar(255),
  [ZIPCode] nvarchar(255),
  [Country] nvarchar(255),
  [PhoneNumber] nvarchar(255)
)
GO

ALTER TABLE [UserPayment] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [UserAddress] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Type] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
GO

ALTER TABLE [Item] ADD FOREIGN KEY ([SeriesId]) REFERENCES [Series] ([Id])
GO

ALTER TABLE [Item] ADD FOREIGN KEY ([TypeId]) REFERENCES [Type] ([Id])
GO

ALTER TABLE [SeriesApplication] ADD FOREIGN KEY ([SeriesId]) REFERENCES [Series] ([Id])
GO

ALTER TABLE [SeriesApplication] ADD FOREIGN KEY ([ApplicationId]) REFERENCES [Application] ([Id])
GO

ALTER TABLE [UserItemReview] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [UserItemFavorite] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [UserItemReview] ADD FOREIGN KEY ([ItemId]) REFERENCES [Item] ([Id])
GO

ALTER TABLE [UserItemFavorite] ADD FOREIGN KEY ([ItemId]) REFERENCES [Item] ([Id])
GO

ALTER TABLE [PackItem] ADD FOREIGN KEY ([PackId]) REFERENCES [Pack] ([Id])
GO

ALTER TABLE [PackItem] ADD FOREIGN KEY ([ItemId]) REFERENCES [Item] ([Id])
GO

ALTER TABLE [OrderItem] ADD FOREIGN KEY ([OrderId]) REFERENCES [Order] ([Id])
GO

ALTER TABLE [OrderItem] ADD FOREIGN KEY ([ItemId]) REFERENCES [Item] ([Id])
GO

ALTER TABLE [Order] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO



-- STARTING DATA --

INSERT INTO [User] (FirebaseId,IsAdmin,[Name],Email,RewardsPoints)
VALUES
  ('','1','Damon Blanchard','damonblanchard@aol.net',null),
  ('','0','Amela Wall','amelawall@yahoo.edu',2),
  ('','0','Hedley Waters','hedleywaters4172@protonmail.net',12),
  ('','0','Aaron Hancock','aaronhancock@yahoo.org',31),
  ('','0','Portia Dudley','portiadudley@protonmail.com',49)
GO

INSERT INTO UserAddress (UserId, [Type], NickName, CompanyName, LineOne, LineTwo, City, [State], ZIPCode, Country, IsDefault)
VALUES
	(2,'billing','','','971-5940 Lorem. Av.','','Nampa','Idaho','66888','United States','1'),
	(2,'shipping','','','971-5940 Lorem. Av.','','Nampa','Idaho','66888','United States','1'),
	(2,'shipping','','','4000 Cubilia Avenue','Apt 754','Huntsville','Alabama','35581','United States','0'),
	(3,'billing','','','5785 Nec Road','Apt 95','South Bend','Indiana','85249','United States','1'),
	(3,'shipping','','','5785 Nec Road','Apt 95','South Bend','Indiana','85249','United States','1'),
	(3,'shipping','','','135-9762 Suspendisse Rd.','','Saint Paul','Minnesota','72381','United States','0'),
	(4,'billing','','','146-596 Nibh Rd.','','Austin','Texas','78502','United States','1'),
	(4,'shipping','','','146-596 Nibh Rd.','','Austin','Texas','78502','United States','1'),
	(4,'shipping','','','6439 Urna Rd.','','New Haven','Connecticut','88747','United States','0'),
	(5,'billing','','','6655 Suspendisse Rd.','','Fayetteville','Arkansas','71276','United States','1'),
	(5,'shipping','','','6655 Suspendisse Rd.','','Fayetteville','Arkansas','71276','United States','1'),
	(5,'shipping','','','6705 Elit Rd.','','Idaho Falls','Idaho','32751','United States','0');
GO

INSERT INTO Category ([Name],[Image])
VALUES
	('Cymbals',null),
	('Accessories',null)
GO

select * from UserAddress