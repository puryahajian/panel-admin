# مرحله 1: ساخت پروژه ری‌اکت
FROM node:18-alpine AS build

# تنظیم دایرکتوری کاری
WORKDIR /app

# کپی فایل‌های package.json و package-lock.json
COPY package*.json ./

# نصب وابستگی‌ها
RUN npm install --force

# کپی بقیه فایل‌های پروژه
COPY . .

# ساخت پروژه برای محیط تولید
RUN npm run build

# مرحله 2: سرو کردن با Nginx
FROM nginx:alpine

# کپی فایل‌های ساخته‌شده به دایرکتوری Nginx
COPY --from=build /app/build /usr/share/nginx/html

# کپی فایل تنظیمات Nginx (اختیاری، در صورت نیاز)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# باز کردن پورت 80
EXPOSE 80

# اجرای Nginx
CMD ["nginx", "-g", "daemon off;"]