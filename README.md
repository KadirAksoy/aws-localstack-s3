<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Upload ve Download Uygulaması</title>
</head>
<body>
    <h1>File Upload ve Download ile AWS S3</h1>
    <p>Bu, AWS S3 kullanarak dosya yükleme ve indirme işlemlerini gerçekleştiren basit bir uygulamadır. Uygulama, npm, AWS CLI ve Docker kullanarak yerel bir S3 ortamı oluşturur.</p>

    <h2>Gereksinimler</h2>
    <p>Başlamadan önce bilgisayarınızda aşağıdakilerin kurulu olduğundan emin olun:</p>
    <ul>
        <li><a href="https://nodejs.org/">Node.js ve npm</a></li>
        <li><a href="https://aws.amazon.com/cli/">AWS CLI</a></li>
        <li><a href="https://www.docker.com/">Docker</a></li>
    </ul>

    <h2>Kurulum Talimatları</h2>
    
    <h3>Adım 1: AWS CLI'yi Yapılandırın</h3>
    <p>Komut istemcinizi veya terminalinizi açın ve AWS CLI'yi yapılandırmak için aşağıdaki komutu çalıştırın:</p>
    <pre><code>aws configure</code></pre>
    <p>İstendiğinde şu bilgileri girin:</p>
    <pre><code>
AWS Access Key ID [None]: test
AWS Secret Access Key [None]: test
Default region name [None]: us-east-1
Default output format [None]: json
    </code></pre>

    <h3>Adım 2: Bir S3 Bucket Oluşturun</h3>
    <p>Yerel bir S3 bucket oluşturmak için LocalStack kullanarak aşağıdaki komutu çalıştırın:</p>
    <pre><code>aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket my-local-bucket</code></pre>

    <h3>Adım 3: Bağımlılıkları Yükleyin</h3>
    <p>Proje dizinine gidin ve gerekli npm paketlerini yükleyin:</p>
    <pre><code>npm install</code></pre>

    <h3>Adım 4: Uygulamayı Başlatın</h3>
    <p>Uygulamayı başlatmak için aşağıdaki komutu çalıştırın:</p>
    <pre><code>node app.js</code></pre>
    <p>Uygulama <a href="http://localhost:3000">http://localhost:3000</a> adresinde çalışıyor olacak.</p>

    <h2>Kullanım</h2>

    <h3>Dosya Yükleme</h3>
    <p>Bir dosya yüklemek için, dosyayı istek gövdesine ekleyerek aşağıdaki endpoint'e POST isteği gönderin:</p>
    <pre><code>POST http://localhost:3000/upload</code></pre>

    <h3>Dosya İndirme</h3>
    <p>Bir dosya indirmek için, dosya adını URL'ye ekleyerek aşağıdaki endpoint'e GET isteği gönderin:</p>
    <pre><code>GET http://localhost:3000/download/{fileName}</code></pre>
    <p>{fileName} yerine indirmek istediğiniz dosyanın adını yazın.</p>

    <h2>Lisans</h2>
    <p>Bu proje MIT Lisansı altında lisanslanmıştır.</p>
</body>
</html>

