CREATE TABLE "Warehouse"(
    "id" SMALLINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "shop_id" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Warehouse" ADD PRIMARY KEY("id");
CREATE TABLE "User"(
    "id" SMALLINT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "joined_date" DATE NOT NULL,
    "role" SMALLINT NOT NULL
);
ALTER TABLE
    "User" ADD PRIMARY KEY("id");
ALTER TABLE
    "User" ADD CONSTRAINT "user_email_unique" UNIQUE("email");
CREATE TABLE "Subscription"(
    "id" SMALLINT NOT NULL,
    "amount" FLOAT(53) NOT NULL,
    "duration" SMALLINT NOT NULL
);
ALTER TABLE
    "Subscription" ADD PRIMARY KEY("id");
CREATE TABLE "Marketplace"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Marketplace" ADD PRIMARY KEY("id");
CREATE TABLE "Product"(
    "id" INTEGER NOT NULL,
    "shop_id" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Product" ADD PRIMARY KEY("id");
CREATE TABLE "APIServices"(
    "service_id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "status" SMALLINT NOT NULL,
    "app_key" VARCHAR(255) NOT NULL,
    "app_secret" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "APIServices" ADD PRIMARY KEY("service_id");
CREATE TABLE "Order"(
    "id" INTEGER NOT NULL,
    "tracking_id" VARCHAR(255) NOT NULL,
    "status" SMALLINT NOT NULL,
    "shop_id" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Order" ADD PRIMARY KEY("id");
CREATE TABLE "Shop"(
    "shop_id" VARCHAR(255) NOT NULL,
    "shop_name" VARCHAR(255) NOT NULL,
    "shop_code" VARCHAR(255) NOT NULL,
    "access_token" VARCHAR(255) NOT NULL,
    "access_token_expire_in" DATE NOT NULL,
    "user_id" SMALLINT NOT NULL,
    "marketplace_id" SMALLINT NOT NULL,
    "api_service_id" VARCHAR(255) NOT NULL,
    "subscription_start_date" DATE NOT NULL,
    "subscription_expire_date" DATE NOT NULL,
    "refresh_token" VARCHAR(255) NOT NULL,
    "refresh_token_expire_in" DATE NOT NULL,
    "seller_base_region" VARCHAR(255) NOT NULL,
    "shop_cipher" VARCHAR(255) NOT NULL,
    "subscription_id" SMALLINT NOT NULL
);
ALTER TABLE
    "Shop" ADD PRIMARY KEY("shop_id");
ALTER TABLE
    "Shop" ADD CONSTRAINT "shop_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "User"("id");
ALTER TABLE
    "Order" ADD CONSTRAINT "order_shop_id_foreign" FOREIGN KEY("shop_id") REFERENCES "Shop"("shop_id");
ALTER TABLE
    "Shop" ADD CONSTRAINT "shop_api_service_id_foreign" FOREIGN KEY("api_service_id") REFERENCES "APIServices"("service_id");
ALTER TABLE
    "Shop" ADD CONSTRAINT "shop_marketplace_id_foreign" FOREIGN KEY("marketplace_id") REFERENCES "Marketplace"("id");
ALTER TABLE
    "Product" ADD CONSTRAINT "product_shop_id_foreign" FOREIGN KEY("shop_id") REFERENCES "Shop"("shop_id");
ALTER TABLE
    "Shop" ADD CONSTRAINT "shop_subscription_id_foreign" FOREIGN KEY("subscription_id") REFERENCES "Subscription"("id");