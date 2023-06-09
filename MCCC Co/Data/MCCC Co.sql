USE [master]
GO

IF db_id('MCCC Co') IS NULL
  CREATE DATABASE [MCCC Co]
GO

USE [MCCC Co]
GO

DROP TABLE IF EXISTS [OrderItem];
DROP TABLE IF EXISTS [PackItem];
DROP TABLE IF EXISTS [SeriesApplication];
DROP TABLE IF EXISTS [Distributor];
DROP TABLE IF EXISTS [Order];
DROP TABLE IF EXISTS [UserShippingAddress];
DROP TABLE IF EXISTS [Application];
DROP TABLE IF EXISTS [Pack];
DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Item];
DROP TABLE IF EXISTS [ItemTypeSeries];
DROP TABLE IF EXISTS [Type];
DROP TABLE IF EXISTS [Series];

CREATE TABLE [User] (
  [Id] int PRIMARY KEY identity,
  [FirebaseId] nvarchar(255) unique not null,
  [IsAdmin] bit not null,
  [Name] nvarchar(255) not null,
  [Email] nvarchar(255) not null,
  [RewardsPoints] int
)
GO

CREATE TABLE [UserShippingAddress] (
  [Id] int PRIMARY KEY identity,
  [UserId] int not null,
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

CREATE TABLE [Series] (
  [Id] int PRIMARY KEY identity,
  [Name] nvarchar(255) unique not null,
  [Alloy] nvarchar(255),
  [BrightnessLevel] int,
  [Description] nvarchar(500),
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

CREATE TABLE [Type] (
  [Id] int PRIMARY KEY identity,
  [Name] nvarchar(255) unique not null,
  [Image] nvarchar(255)
)
GO

CREATE TABLE [Item] (
  [Id] int PRIMARY KEY identity,
  [TypeId] int,
  [SeriesId] int,
  [Height] int,
  [Width] int,
  [Depth] int,
  [Description] nvarchar(500),
  [Image] nvarchar(255),
  [Price] float not null,
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
  [Name] nvarchar(255) unique not null,
  [Description] nvarchar(255),
  [Image] nvarchar(255)
)
GO

CREATE TABLE [OrderItem] (
  [Id] int PRIMARY KEY identity,
  [OrderId] int not null,
  [ItemId] int not null,
  [ItemQuantity] int not null
)
GO

CREATE TABLE [Order] (
  [Id] int PRIMARY KEY identity,
  [UserId] int not null,
  [DateCreated] datetime not null,
  [DateCompleted] datetime,
  [RewardsUsed] int,
  [TotalValue] float,
  [TotalPaid] float,
  [ConfirmationNumber] nvarchar(255),
  [ShipCompanyName] nvarchar(255),
  [ShipLineOne] nvarchar(255),
  [ShipLineTwo] nvarchar(255),
  [ShipCity] nvarchar(255),
  [ShipState] nvarchar(255),
  [ShipZIPCode] nvarchar(255),
  [ShipCountry] nvarchar(255)
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

ALTER TABLE [UserShippingAddress] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Item] ADD FOREIGN KEY ([TypeId]) REFERENCES [Type] ([Id])
GO

ALTER TABLE [Item] ADD FOREIGN KEY ([SeriesId]) REFERENCES [Series] ([Id])
GO

ALTER TABLE [SeriesApplication] ADD FOREIGN KEY ([SeriesId]) REFERENCES [Series] ([Id])
GO

ALTER TABLE [SeriesApplication] ADD FOREIGN KEY ([ApplicationId]) REFERENCES [Application] ([Id])
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
  ('Q4j4NrUNyrVKtAmXv48ZRBqBt9H2','1','Damon Blanchard','damonblanchard@aol.net',null),
  ('1CKJ2yl8sfd8CfDNzWTtTngodUA2','0','Amela Wall','amelawall@yahoo.edu',2),
  ('3zFml2YSUmXV4TjtCGXySYzMug32','0','Hedley Waters','hedleywaters4172@protonmail.net',12),
  ('0XE9kTSmHRMcj1ycsqflshk944g2','0','Aaron Hancock','aaronhancock@yahoo.org',31),
  ('meCdmJMgIfNIblqkc6fBbl2yjln1','0','Portia Dudley','portiadudley@protonmail.com',49)
GO

INSERT INTO UserShippingAddress (UserId, NickName, CompanyName, LineOne, LineTwo, City, [State], ZIPCode, Country, IsDefault)
VALUES
	(2,'','','971-5940 Lorem. Av.','','Nampa','Idaho','66888','United States','1'),
	(2,'','','4000 Cubilia Avenue','Apt 754','Huntsville','Alabama','35581','United States','0'),
	(3,'','','5785 Nec Road','Apt 95','South Bend','Indiana','85249','United States','1'),
	(3,'','','135-9762 Suspendisse Rd.','','Saint Paul','Minnesota','72381','United States','0'),
	(4,'Apartment','','596 Nibh Rd.','Apt 146','Austin','Texas','78502','United States','1'),
	(4,'Mom''s House','','6439 Urna Rd.','','New Haven','Connecticut','88747','United States','0'),
	(5,'','','6655 Suspendisse Rd.','','Fayetteville','Arkansas','71276','United States','1'),
	(5,'','','6705 Elit Rd.','','Idaho Falls','Idaho','32751','United States','0')
GO

INSERT INTO [Type] ([Name],[Image])
VALUES
	('Ride',null),
	('Crash',null),
	('Splash',null),
	('Hi Hats',null),
	('China',null),
	('Stack',null),
	('Bell',null)
GO

INSERT INTO Series ([Name],Alloy,BrightnessLevel,[Description],[Image])
VALUES
	('MC1','MS63 Brass',2,'MC1 cymbals represent a breakthrough combination of quality and value, and convince with superior sound and appearance.',null),
	('MC2','MS63 Brass',2,'Ushering in a higher standard of sound and durability, the MC2 series stay true to the renown MCCC quality whilst offering an affordable option for the aspiring drummer looking for high performance and quality sound at an attainable price.',null),
	('MC3','CuSn8 Bronze',3,'MC3 cymbals offer the big, bright, vintage sound that takes you straight back to the height of Classic Rock.',null),
	('Signature','CuSn20',1,'Forged from a proprietary bronze developed specifically for cymbals, handcrafted from start to finish by highly skilled craftsmen, conceived and executed according to uncompromising sound concepts, Signature Cymbals are instruments of unsurpassed quality for the discerning drummer�s quest for personal creativity and musical excellence.',null),
	('MCFX','CuSn8 Bronze',1,'MCFX is a complete collection of extremely affordable effect cymbals. The core of the MCFX is made up of the Swiss models, cymbals that achieve a noisy, dirty, trashy sound quality by the use of specific layouts and varied sizes for the holes.',null)
GO

INSERT INTO [Application] ([Case])
VALUES
	('Soft setting'),
	('Loud setting'),
	('Acoustic music'),
	('Live'),
	('Recording'),
	('Jazz'),
	('Rock'),
	('Pop'),
	('Country'),
	('Blues'),
	('Latin'),
	('Classical'),
	('Punk'),
	('Heavy Metal'),
	('Experimental')
GO

INSERT INTO SeriesApplication (SeriesId,ApplicationId)
VALUES
	(1,2),
	(1,4),
	(1,7),
	(1,8),
	(1,9),
	(1,13),
	(1,14),
	(2,1),
	(2,2),
	(2,3),
	(2,4),
	(2,5),
	(2,7),
	(2,8),
	(2,9),
	(2,10),
	(2,11),
	(2,13),
	(3,2),
	(3,4),
	(3,5),
	(3,7),
	(3,8),
	(3,9),
	(3,10),
	(3,11),
	(3,14),
	(4,1),
	(4,3),
	(4,4),
	(4,5),
	(4,6),
	(4,8),
	(4,10),
	(4,11),
	(4,12),
	(4,15),
	(5,1),
	(5,2),
	(5,4),
	(5,5),
	(5,13),
	(5,14),
	(5,15)
GO

INSERT INTO [Item] (TypeId,SeriesId,Height,Width,Depth,[Description],[Image],Price,PurchaseCount)
VALUES
	(1,1,null,18,18,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20900%20Ride.png?alt=media&token=45560f58-98c6-4ec2-b23b-3520e35f963a',45,1),
	(1,1,null,20,20,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20900%20Ride.png?alt=media&token=45560f58-98c6-4ec2-b23b-3520e35f963a',50,10),
	(1,1,null,22,22,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20900%20Ride.png?alt=media&token=45560f58-98c6-4ec2-b23b-3520e35f963a',55,8),
	(2,1,null,14,14,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20900%20Crash.png?alt=media&token=21995a39-da8a-45e4-875c-0e1cdc2b621a',30,2),
	(2,1,null,16,16,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20900%20Crash.png?alt=media&token=21995a39-da8a-45e4-875c-0e1cdc2b621a',35,12),
	(2,1,null,18,18,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20900%20Crash.png?alt=media&token=21995a39-da8a-45e4-875c-0e1cdc2b621a',40,8),
	(3,1,null,8,8,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20900%20Splash.png?alt=media&token=14f32a06-d435-4df2-aff9-c7e0cc2b949c',15,4),
	(3,1,null,10,10,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20900%20Splash.png?alt=media&token=14f32a06-d435-4df2-aff9-c7e0cc2b949c',20,5),
	(4,1,null,13,13,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20900%20Hi%20Hats.png?alt=media&token=f9215f42-a624-4664-9a2f-c475aec79ae3',50,2),
	(4,1,null,14,14,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20900%20Hi%20Hats.png?alt=media&token=f9215f42-a624-4664-9a2f-c475aec79ae3',55,15),
	(4,1,null,15,15,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20900%20Hi%20Hats.png?alt=media&token=f9215f42-a624-4664-9a2f-c475aec79ae3',60,5),
	(5,1,null,16,16,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20900%20China.png?alt=media&token=85865531-ebbd-40d7-a3cb-49a0ba83d793',45,2),
	(5,1,null,18,18,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20900%20China.png?alt=media&token=85865531-ebbd-40d7-a3cb-49a0ba83d793',50,1),

	(1,2,null,18,18,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%202002%20Ride.png?alt=media&token=dc02fc2a-a7b7-4a94-8e23-c62be00f76ac',70,1),
	(1,2,null,20,20,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%202002%20Ride.png?alt=media&token=dc02fc2a-a7b7-4a94-8e23-c62be00f76ac',75,9),
	(1,2,null,22,22,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%202002%20Ride.png?alt=media&token=dc02fc2a-a7b7-4a94-8e23-c62be00f76ac',80,8),
	(2,2,null,14,14,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%202002%20Crash.png?alt=media&token=dbd80302-468c-4424-af53-ea083db58ab7',60,1),
	(2,2,null,16,16,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%202002%20Crash.png?alt=media&token=dbd80302-468c-4424-af53-ea083db58ab7',65,10),
	(2,2,null,18,18,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%202002%20Crash.png?alt=media&token=dbd80302-468c-4424-af53-ea083db58ab7',70,7),
	(3,2,null,8,8,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%202002%20Splash.png?alt=media&token=939d1ca0-3e50-4b04-bd00-f918bd624d35',40,2),
	(3,2,null,10,10,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%202002%20Splash.png?alt=media&token=939d1ca0-3e50-4b04-bd00-f918bd624d35',45,4),
	(4,2,null,13,13,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%202002%20Hi%20Hats.png?alt=media&token=6f53df3d-f815-4e37-9db3-3e52810d4ae8',80,0),
	(4,2,null,14,14,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%202002%20Hi%20Hats.png?alt=media&token=6f53df3d-f815-4e37-9db3-3e52810d4ae8',85,11),
	(4,2,null,15,15,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%202002%20Hi%20Hats.png?alt=media&token=6f53df3d-f815-4e37-9db3-3e52810d4ae8',90,1),
	(5,2,null,16,16,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%202002%20China.png?alt=media&token=989c7f40-33c0-48f6-ab2d-451235d89a49',70,1),
	(5,2,null,18,18,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%202002%20China.png?alt=media&token=989c7f40-33c0-48f6-ab2d-451235d89a49',75,0),

	(1,3,null,18,18,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20F602ME%20Ride.png?alt=media&token=c17b3f55-fd40-42e6-821e-3726fa4600e9',100,3),
	(1,3,null,20,20,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20F602ME%20Ride.png?alt=media&token=c17b3f55-fd40-42e6-821e-3726fa4600e9',105,10),
	(1,3,null,22,22,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20F602ME%20Ride.png?alt=media&token=c17b3f55-fd40-42e6-821e-3726fa4600e9',110,8),
	(2,3,null,14,14,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20F602ME%20Crash.png?alt=media&token=5b74c0ef-0d9f-4efe-ad3a-bb9ed0507ae8',80,4),
	(2,3,null,16,16,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20F602ME%20Crash.png?alt=media&token=5b74c0ef-0d9f-4efe-ad3a-bb9ed0507ae8',85,12),
	(2,3,null,18,18,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20F602ME%20Crash.png?alt=media&token=5b74c0ef-0d9f-4efe-ad3a-bb9ed0507ae8',90,7),
	(3,3,null,8,8,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20F602ME%20Splash.png?alt=media&token=da7be46d-c45f-469d-9d74-4adaa7d5bb8c',50,1),
	(3,3,null,10,10,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20F602ME%20Splash.png?alt=media&token=da7be46d-c45f-469d-9d74-4adaa7d5bb8c',55,2),
	(4,3,null,13,13,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20Signature%20Hi%20Hats.png?alt=media&token=4dc9be57-5082-4207-9c0f-24c5031a5a6d',110,3),
	(4,3,null,14,14,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20Signature%20Hi%20Hats.png?alt=media&token=4dc9be57-5082-4207-9c0f-24c5031a5a6d',115,17),
	(4,3,null,15,15,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20Signature%20Hi%20Hats.png?alt=media&token=4dc9be57-5082-4207-9c0f-24c5031a5a6d',120,5),
	(5,3,null,16,16,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20F602ME%20China.png?alt=media&token=4d8ee4c6-7e4d-4455-af1d-1127ce0badd0',95,0),
	(5,3,null,18,18,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20F602ME%20China.png?alt=media&token=4d8ee4c6-7e4d-4455-af1d-1127ce0badd0',100,0),

	(1,4,null,18,18,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20Signature%20Ride.png?alt=media&token=f7d19883-a72e-4352-ade6-dcb92559768c',160,4),
	(1,4,null,20,20,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20Signature%20Ride.png?alt=media&token=f7d19883-a72e-4352-ade6-dcb92559768c',170,10),
	(1,4,null,21,21,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20Signature%20Ride.png?alt=media&token=f7d19883-a72e-4352-ade6-dcb92559768c',175,4),
	(1,4,null,22,22,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20Signature%20Ride.png?alt=media&token=f7d19883-a72e-4352-ade6-dcb92559768c',180,8),
	(2,4,null,14,14,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20Signature%20Crash.png?alt=media&token=f9cd5345-8a0c-44c2-b582-6b3ee8c117f0',150,2),
	(2,4,null,16,16,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20Signature%20Crash.png?alt=media&token=f9cd5345-8a0c-44c2-b582-6b3ee8c117f0',160,10),
	(2,4,null,18,18,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20Signature%20Crash.png?alt=media&token=f9cd5345-8a0c-44c2-b582-6b3ee8c117f0',170,9),
	(4,4,null,13,13,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20Signature%20Hi%20Hats.png?alt=media&token=4dc9be57-5082-4207-9c0f-24c5031a5a6d',180,1),
	(4,4,null,14,14,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20Signature%20Hi%20Hats.png?alt=media&token=4dc9be57-5082-4207-9c0f-24c5031a5a6d',190,10),
	(4,4,null,15,15,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Paiste%20Signature%20Hi%20Hats.png?alt=media&token=4dc9be57-5082-4207-9c0f-24c5031a5a6d',200,7),

	(6,5,null,16,16,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/PST%20X%20Swiss%20Flanger%20Stack.png?alt=media&token=5cb7bb29-f297-4a60-940e-d8463c957236',80,2),
	(6,5,null,18,18,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/PST%20X%20Swiss%20Flanger%20Stack.png?alt=media&token=5cb7bb29-f297-4a60-940e-d8463c957236',90,1),
	(7,5,null,6,6,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/PST%20X%20Pure%20Bell.png?alt=media&token=4138b6f8-a4b2-449f-a4bd-692d4b1cfce0',70,3),
	(7,5,null,8,8,null,'https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/PST%20X%20Pure%20Bell.png?alt=media&token=4138b6f8-a4b2-449f-a4bd-692d4b1cfce0',80,0)
GO

INSERT INTO [Order] (UserId,DateCreated,DateCompleted,RewardsUsed,TotalValue,TotalPaid,ConfirmationNumber,ShipCompanyName,ShipLineOne,ShipLineTwo,ShipCity,ShipState,ShipZIPCode,ShipCountry)
VALUES
  (1,'2020-06-21T17:10:02.000Z','2020-11-27T16:35:15.000Z',null,255,null,'QW0A18TW0I8B0O',null,null,null,null,null,null,null),
  (2,'2020-04-18T09:04:17.000Z','2020-11-18T23:52:19.000Z',28,95,67,'JK0I34HN0N2E0F','','4000 Cubilia Avenue','Apt 754','Huntsville','Alabama','35581','United States'),
  (3,'2020-03-26T05:35:47.000Z','2020-11-26T05:14:51.000Z',0,225,225,'IY0R54KN0S8H0T','','135-9762 Suspendisse Rd.','','Saint Paul','Minnesota','72381','United States'),
  (4,'2020-06-02T02:09:35.000Z','2020-11-15T13:25:39.000Z',23,253,230,'MS0Q77TR0D3E0O','','6439 Urna Rd.','','New Haven','Connecticut','88747','United States'),
  (5,'2020-08-01T13:41:07.000Z','2020-11-23T16:49:20.000Z',33,197,164,'PS0O13QD0D2K0F','','6705 Elit Rd.','','Idaho Falls','Idaho','32751','United States'),
  (1,'2021-01-10T12:07:23.000Z','2021-02-03T02:51:49.000Z',null,251,null,'QS0C88TY0Y2U0O',null,null,null,null,null,null,null),
  (2,'2021-01-23T08:50:48.000Z','2021-02-02T18:04:17.000Z',6,315,309,'XX0M43YQ0E8A0Y','','4000 Cubilia Avenue','Apt 754','Huntsville','Alabama','35581','United States'),
  (3,'2021-01-06T00:33:20.000Z','2021-02-01T18:39:09.000Z',21,293,272,'OO0I71HL0C1K0M','','135-9762 Suspendisse Rd.','','Saint Paul','Minnesota','72381','United States'),
  (4,'2021-01-12T23:13:32.000Z','2021-01-30T10:32:16.000Z',22,72,50,'IP0B64JK0Q8S0O','','6439 Urna Rd.','','New Haven','Connecticut','88747','United States'),
  (5,'2021-01-26T16:14:15.000Z','2021-02-02T06:29:53.000Z',10,214,204,'MN0L78UH0I0O0C','','6705 Elit Rd.','','Idaho Falls','Idaho','32751','United States'),
  (1,'2021-03-15T21:06:35.000Z','2021-04-03T19:30:28.000Z',null,127,null,'TK0L84SC0U7W0S',null,null,null,null,null,null,null),
  (2,'2021-03-25T06:03:37.000Z','2021-04-07T05:04:04.000Z',35,281,246,'XJ0Y49MB0P6X0B','','971-5940 Lorem. Av.','','Nampa','Idaho','66888','United States'),
  (3,'2021-03-24T21:28:46.000Z','2021-04-29T06:29:14.000Z',27,231,204,'KM0S54KO0J7L0X','','5785 Nec Road','Apt 95','South Bend','Indiana','85249','United States'),
  (4,'2021-03-20T19:36:51.000Z','2021-04-07T12:12:39.000Z',4,53,49,'MY0K84VT0E3H0K','','596 Nibh Rd.','Apt 146','Austin','Texas','78502','United States'),
  (5,'2021-03-26T04:08:04.000Z','2021-04-14T23:52:42.000Z',2,69,67,'LS0H26DQ0M5E0I','','6655 Suspendisse Rd.','','Fayetteville','Arkansas','71276','United States'),
  (1,'2021-09-07T21:40:02.000Z','2022-02-04T13:17:14.000Z',null,305,null,'YF0N04EC0C9M0Q',null,null,null,null,null,null,null),
  (2,'2021-09-05T06:37:43.000Z','2022-02-23T15:59:44.000Z',12,168,156,'MQ0Q31WK0R6U0P','','971-5940 Lorem. Av.','','Nampa','Idaho','66888','United States'),
  (3,'2021-09-05T18:04:08.000Z','2022-02-19T10:24:12.000Z',22,149,127,'OR0T90EQ0U8T0K','','5785 Nec Road','Apt 95','South Bend','Indiana','85249','United States'),
  (4,'2021-09-04T05:14:44.000Z','2022-02-18T10:46:34.000Z',31,322,291,'AE0N38SW0C2B0J','','596 Nibh Rd.','Apt 146','Austin','Texas','78502','United States'),
  (5,'2021-09-08T04:45:11.000Z','2022-02-06T02:17:27.000Z',40,267,227,'RI0I92YJ0K6G0I','','6655 Suspendisse Rd.','','Fayetteville','Arkansas','71276','United States'),
  (1,'2022-03-13T23:38:56.000Z',null,null,null,null,null,'',null,null,null,null,null,null),
  (2,'2022-06-28T13:07:30.000Z',null,null,null,null,null,'','971-5940 Lorem. Av.','','Nampa','Idaho','66888','United States'),
  (3,'2022-07-26T06:45:37.000Z',null,null,null,null,null,'','5785 Nec Road','Apt 95','South Bend','Indiana','85249','United States'),
  (4,'2022-03-13T07:17:53.000Z',null,null,null,null,null,'','596 Nibh Rd.','Apt 146','Austin','Texas','78502','United States'),
  (5,'2022-06-01T10:52:33.000Z',null,null,null,null,null,'','6655 Suspendisse Rd.','','Fayetteville','Arkansas','71276','United States')
GO

INSERT INTO OrderItem (OrderId,ItemId,ItemQuantity)
VALUES
	(1,4,2),
	(1,3,1),
	(2,5,2),
	(2,5,2),
	(3,1,1),
	(3,2,2),
	(4,7,2),
	(4,10,1),
	(5,15,1),
	(5,11,2),
	(6,2,2),
	(6,23,3),
	(7,4,2),
	(7,6,2),
	(8,8,1),
	(8,9,1),
	(9,10,2),
	(9,1,1),
	(10,1,2),
	(10,4,2),
	(11,6,1),
	(11,7,2),
	(12,8,1),
	(12,10,2),
	(13,15,1),
	(13,16,1),
	(14,19,1),
	(14,21,2),
	(15,25,1),
	(15,24,2),
	(16,1,2),
	(16,24,2),
	(17,1,2),
	(17,52,1),
	(18,51,2),
	(18,24,2),
	(19,44,1),
	(19,34,1),
	(20,38,2),
	(20,39,1),
	(21,24,2),
	(21,49,1),
	(22,52,1),
	(22,23,1),
	(23,34,2),
	(23,35,1),
	(24,36,2),
	(24,37,1),
	(25,20,2),
	(25,12,1)
GO

INSERT INTO Pack ([Name],[Description],[Image])
VALUES
	('Starter','Kick off your drumming career with the Starter Pack. You''ll instantly sound like a rockstar without hurting your wallet!','https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Pack%20-%20Starter.png?alt=media&token=a6125076-6384-4229-8c68-2d6b2ce76e8c'),
	('Rockstar','The Rockstar Pack provides everything a touring rock drummer needs. These large cymbals will cut through any live mix.','https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Pack%20-%20Rockstar.png?alt=media&token=0aee1476-6bab-4b8d-aac1-25f18e64a1cd'),
	('Mega','This one is for the gearheads who can''t find a room big enough to fit their kit. The Mega Pack provides a little bit of everything.','https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Pack%20-%20Mega.png?alt=media&token=c8bc2d51-08f4-4c55-887e-33de252c0615'),
	('Jazzcat','The Jazzcat Pack consists of MCCC Co''s highest quality cymbals, hand selected by Buddy Rich himself.','https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Pack%20-%20Jazzcat.png?alt=media&token=a7e90c01-42d8-4bcc-90bc-c7a7e187b97d'),
	('Cocktail','Got a low-volume lounge gig? We''ve got you covered. The Cocktail Pack has the small cymbals you need for delicate gigging.','https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Pack%20-%20Cocktail.png?alt=media&token=693a771e-89a1-45d9-9742-59c6de538bc8'),
	('New School','This one is for all the innovators and experimentalists. The New School Pack was made by Dan Mayo himself, and he (allegedly) "plays them sometimes on his kit at home"!','https://firebasestorage.googleapis.com/v0/b/mccc-co.appspot.com/o/Pack%20-%20New%20School.png?alt=media&token=3a5452e2-1ddb-4808-a835-37abc8cdfa9a')
GO

INSERT INTO PackItem (PackId,ItemId)
VALUES
	(1,2),
	(1,5),
	(1,10),

	(2,29),
	(2,31),
	(2,32),
	(2,37),

	(3,16),
	(3,19),
	(3,18),
	(3,31),
	(3,20),
	(3,23),
	(3,25),
	(3,50),

	(4,42),
	(4,48),

	(5,14),
	(5,21),
	(5,22),

	(6,41),
	(6,49),
	(6,51),
	(6,52)
GO

INSERT INTO Distributor ([Name],AddressLineOne,AddressLineTwo,City,[State],Country,ZIPCode,PhoneNumber)
VALUES
  ('Arizona Drum Shop','1530 Scelerisque Road','Ste 102','Mesa','Arizona','United States','76571','1-335-387-5828'),
  ('Bentley''s Drum Shop','9055 Aliquam St.','','Bear','Delaware','United States','99086','(848) 359-2502'),
  ('Dub''s Drum Basement','577 Morbi Rd.','','Worcester','Massachusetts','United States','49327','(469) 522-6566'),
  ('Lone Star Percussion','639-7413 Orci St.','','Miami','Florida','United States','86677','1-554-518-5721'),
  ('Professional Drum Shop','7662 Sit Rd.','','Nampa','Idaho','United States','68653','(675) 640-8586'),
  ('A Drummer''s Tradition','673 In Rd.','','Grand Rapids','Michigan','United States','25738','(280) 252-8434'),
  ('Boulder Drums','281-7362 Dapibus Rd.','','Henderson','Nevada','United States','68373','(569) 456-6284'),
  ('Davenport Percussion','297-8685 Luctus Av.','','Davenport','Iowa','United States','19126','(883) 218-7843'),
  ('Rupp''s Drums','4369 Magna. Rd.','','Indianapolis','Indiana','United States','29476','(169) 477-6355'),
  ('Dynamic Percussion','5224 Cras Avenue','','Rockville','Maryland','United States','46358','(366) 647-7371'),
  ('CK''s Drum Shop','8646 Non, Avenue','Ste 400','Lowell','Massachusetts','United States','39819','(768) 312-6739'),
  ('Resurrection Drums','6374 Neque. St.','','Biloxi','Mississippi','United States','40886','1-395-955-6846'),
  ('Drummersonly Drum Shop','5740 Erat, St.','','Bellevue','Nebraska','United States','93831','1-141-655-7686'),
  ('Metairie Drum Center','736 Donec Rd.','','Metairie','Louisiana','United States','48621','(732) 476-3881'),
  ('Maxwell Drums','196-940 Lorem St.','','Colorado Springs','Colorado','United States','62395','(618) 342-2362'),
  ('Mike''s Drum Shop','4499 Donec Street','','Olathe','Kansas','United States','60244','(342) 661-8112'),
  ('Cymbal House','694-5620 Pede, St.','','Chattanooga','Tennessee','United States','92382','1-265-251-1324'),
  ('Ray Fransen''s Drum Center','3144 Eu Ave','','Hattiesburg','Mississippi','United States','14614','(213) 686-2821'),
  ('Washington Percussion','3660 Et St.','','Tacoma','Washington','United States','38113','1-256-735-7663'),
  ('The Drum Shop','9014 Mauris. Avenue','Ste 8700','Lawton','Oklahoma','United States','18683','1-615-748-0466'),
  ('Drums on Sale','4811 Magna Road','','Dallas','Texas','United States','34265','(631) 720-8157'),
  ('Nashville Drums','783 Facilisis Avenue','','Nashville','Tennessee','United States','03124','(271) 665-3808'),
  ('East Coast Drums','500 Nec Avenue','','Bear','Delaware','United States','33315','1-123-289-2576'),
  ('Fayetteville Drum Center','331-7919 Ornare, Rd.','Ste 50','Fayetteville','Arkansas','United States','21647','(292) 747-3286'),
  ('247Drums','3682 Augue Road','','Hillsboro','Oregon','United States','67845','(853) 276-8589'),
  ('Jack''s Drum Shop','5306 Ante, Road','','St. Petersburg','Florida','United States','24247','1-147-527-3640'),
  ('Virtue Drums','4331 Aliquet, Av.','','Mobile','Alabama','United States','89176','1-787-657-0251'),
  ('Klash Drums','162 Rhoncus. Road','','Fairbanks','Alaska','United States','69283','1-884-523-4873'),
  ('The Drum Collective','3751 Tempus Avenue','','Tulsa','Oklahoma','United States','78455','1-501-839-7274'),
  ('Fred Pierce Studio Drum Shop','933 Porttitor Avenue','','Bear','Delaware','United States','27224','1-336-351-7243'),
  ('Explorer''s Percussion','9357 Nisi St.','','Clarksville','Tennessee','United States','45542','(722) 497-1371'),
  ('Drum Center of Henderson','2984 Lectus Rd.','Ste 880','Henderson','Nevada','United States','85438','1-877-255-7462'),
  ('The Drum Den','8420 Diam. Road','','Lexington','Kentucky','United States','24989','1-255-584-5294'),
  ('CHBO Drums','262 Tristique Rd.','','Eugene','Oregon','United States','07665','1-466-939-4224'),
  ('Cadence Drums','2468 Accumsan Street','','Chattanooga','Tennessee','United States','98484','1-918-257-8188'),
  ('Skinny Beats Sound Shop','3543 Faucibus Av.','','Philadelphia','Pennsylvania','United States','36168','(645) 387-7263'),
  ('2112 Percussion','760-6663 Integer Ave','','Grand Rapids','Michigan','United States','47626','1-893-772-2187'),
  ('Badges Drum Shop','6658 Consectetuer Avenue','','Covington','Kentucky','United States','75529','1-484-443-9211'),
  ('Stebal Drums','449-3600 Varius Rd.','','Fresno','California','United States','29887','(588) 978-6806'),
  ('Drum World','3370 Eget Road','','Kearney','Nebraska','United States','03424','(726) 350-9341'),
  ('Sam Adato''s Drum Shop','328-3821 Nonummy Av.','','Coventry','Warwickshire','United Kingdom','XA7B 2','056 8868 0781'),
  ('Drumsation','159-1171 Et Rd.','','Witney','Oxfordshire','United Kingdom','JY7G 7','(016977) 8825'),
  ('Revival Drum Shop','2948 Integer Ave','','Haverfordwest','Pembrokeshire','United Kingdom','YT2Y 6','0800 987355'),
  ('Rhythm Traders','495 Nulla Road','','Coldstream','Berwickshire','United Kingdom','WL1L 6','0845 46 48'),
  ('Woodland Percussion','4017 Risus Avenue','','Linlithgow','West Lothian','United Kingdom','LI6P 4','0845 46 44'),
  ('Dale''s Drum Shop','417-3878 Id, Street','','Milnathort','Kinross-shire','United Kingdom','VJ8G 9','(014124) 48385'),
  ('Hawthorne Drum Shop','183-7303 Dolor St.','','Llanidloes','Montgomeryshire','United Kingdom','JH6W 3','(01068) 36379'),
  ('Hershey Percussion','828-3693 Lorem Av.','','Banbury','Oxfordshire','United Kingdom','OM5W 4','07624 478657'),
  ('The Different Drum Shop','288 Sed Rd.','','Carterton','Oxfordshire','United Kingdom','PE3C 9','(0111) 893 8184'),
  ('Don Till Drum Center','4199 Euismod Street','','Merthyr Tydfil','Glamorgan','United Kingdom','LK4N 3','(021) 1308 5251'),
  ('Son Bleu','538-3747 Nascetur Ave','','Lunel','Languedoc-Roussillon','France','52286','05 58 77 83 28'),
  ('Mains d''Oeuvres','7477 Nulla Ave','','Rouen','Haute-Normandie','France','53083','09 58 75 67 12'),
  ('Entrep�t de Cymbales','403-6177 Elementum St.','','Saint-Dizier','Champagne-Ardenne','France','38145','04 39 63 73 26'),
  ('Marcel Tambouriner','1526 Fringilla, Avenue','','Clermont-Ferrand','Auvergne','France','88796','02 18 78 48 52'),
  ('Camille Percussion','736-6981 Purus Rd.','','Colmar','Alsace','France','84613','09 38 11 18 55'),
  ('Werner Schlagzeug','189 Magnis Street','','Aalen','Baden W�rttemberg','Germany','42455','(05334) 1031274'),
  ('Beckenhaus','2076 Cursus. Ave','','Bremerhaven','Bremen','Germany','30855','(08881) 9638223'),
  ('Trommelversorgung','2440 In Road','','Friedrichshafen','Baden W�rttemberg','Germany','96414','(0388) 16401169'),
  ('Schlagzeugerland','9544 Ac, Street','','M�lheim','Nordrhein-Westphalen','Germany','24632','(02713) 8142032')
GO