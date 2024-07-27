# File Upload ve Download ile AWS S3

Bu, AWS S3 kullanarak dosya yükleme ve indirme işlemlerini gerçekleştiren basit bir uygulamadır. Uygulama, npm, AWS CLI ve Docker kullanarak yerel bir S3 ortamı oluşturur.

## Gereksinimler

Başlamadan önce bilgisayarınızda aşağıdakilerin kurulu olduğundan emin olun:

- [Node.js ve npm](https://nodejs.org/)
- [AWS CLI](https://aws.amazon.com/cli/)
- [Docker](https://www.docker.com/)

## Kurulum Talimatları

### Adım 1: AWS CLI'yi Yapılandırın

Komut istemcinizi veya terminalinizi açın ve AWS CLI'yi yapılandırmak için aşağıdaki komutu çalıştırın:

```
aws configure

AWS Access Key ID [None]: test
AWS Secret Access Key [None]: test
Default region name [None]: us-east-1
Default output format [None]: json
```


### Adım 2: Bir S3 Bucket Oluşturun

Yerel bir S3 bucket oluşturmak için LocalStack kullanarak aşağıdaki komutu çalıştırın:

```
aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket my-local-bucket
```

### Adım 3: Docker Compose ile Uygulamayı Başlatın
Docker compose dosyasını çalıştırın.

```
docker compose up
```

### Adım 4: Bağımlılıkları Yükleyin

```
npm install
```

### Adım 5: Uygulamayı Başlatın

```
node app.js
```

# Kullanım

### Dosya Yükleme
Bir dosya yüklemek için, dosyayı istek gövdesine ekleyerek aşağıdaki endpoint'e POST isteği gönderin:

```
POST http://localhost:3000/upload
```

### Dosya İndirme
bucketName kısmına olutşurduğunuz bucketName'i yazın.
Bir dosya indirmek için, dosya adını URL'ye ekleyerek aşağıdaki endpoint'e GET isteği gönderin:

```
GET http://localhost:3000/{bucketName}/download/{fileName}
```





