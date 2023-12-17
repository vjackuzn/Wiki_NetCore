# Wiki_NetCore

**Requirements for Dev environment:**
Operating system - Windows 10 or greater. Application development was performed on Windows machine, 
therefore connection settings mentioned in this instruction and in .NET application are made for Windows machines only.

**Required software:**
1) .NET Core framework - 8.0 (version used in project).
2) SQL Server 2022 Developer - full-featured free edition, licensed for use as a development and test database in a non-production environment.
3) Database Tool - during development and in following instructions **Azure Data Studio** was used.
4) Node.js (LTS).
5) Angular CLI - 17.0.6 (version used in project).


**Database manipulations:**
1) In Azure Data Studio, create New Connection to SQL Server.
   - In Connection Details window, in "Server" field, "localhost" value should be entered. Click "Connect".
   - When popup appears, click "Enable Trust server certificate".
     
2) When connection is established, click the "New Query" button. In opened window, paste SQL statements below to create new Database, Schema and Table.

CREATE DATABASE WikiDatabase
GO

USE WikiDatabase
GO

CREATE SCHEMA WikiAppSchema
GO

CREATE TABLE WikiAppSchema.Articles
(
    ArticleId INT IDENTITY(1,1) PRIMARY KEY
    , Title NVARCHAR(255)
    , Description NVARCHAR(4000)
    , ArticleType NVARCHAR(50)
    , CreatedAt DATE
)

**Steps to launch the application:**
1) git clone this repository to the desired project's folder.
2) Open the project's "Backend_NET" subfolder in PowerShell:
   - use the "dotnet restore" command. This command will install all required NuGet packages mentioned in the "Backend_NET.csproj" file.
   - use the "dotnet run". This will compile the .NET application and launch it on local webserver.
3) Open the project's "Frontend_Angular" subfolder in PowerShell:
   - use the "npm install" command. This will install packages mentioned in the "package.json" file.
   - use  the "ng serve --open" command. This will launch a local development server and automatically open the application in a browser.
