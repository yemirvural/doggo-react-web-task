## Projeyi Çalıştırma

### 1. Gerekli Paketleri Kurun
Proje dizininde aşağıdaki komutu çalıştırarak gerekli bağımlılıkları yükleyin:

```bash
npm install
```

---

### 2. JSON-Server'ı Başlatın
JSON-Server, projenin sahte API'sini çalıştırır. İlk terminali açarak aşağıdaki komutu çalıştırın:

```bash
npm run json-server
```

- Bu komut, `package.json` içinde şu şekilde tanımlanmıştır:
  ```json
  "scripts": {
    "json-server": "json-server --watch db.json --port 3001"
  }
  ```
- JSON-Server varsayılan olarak `http://localhost:3001` adresinde çalışır.

---

### 3. Uygulamayı Geliştirme Modunda Çalıştırın
İkinci bir terminal açın ve uygulamayı çalıştırmak için şu komutu çalıştırın:

```bash
npm run dev
```

- Bu komut, Next.js veya React uygulamasını geliştirme modunda başlatır.
- Varsayılan olarak, uygulama `http://localhost:3000` adresinde çalışır.

---

## Görev

[Figma](https://www.figma.com/design/GTtrjzfO78hIUx0iXF8OhW/Doggo-FrontEnd-Task?node-id=371-3418&t=cq3ewo3a4uMk6DBe-1) linkindeki tasarımı olabildiğince aslına uygun bir şekilde gerçekleştirmeni talep ediyoruz. Açıklığa kavuşturmak için:

- Tasarım responsive olmalıdır. Tasarım büyük, orta ve küçük ölçekli cihazlar için ayrı ayrı verilmiş durumdadır.
- Tasarım yalnızca ana sayfa tasarımını içermektedir. Bunun dışında 3 farklı sayfanın daha geliştirilmesi beklenmektedir: `#Explore`, `Bookmarks` ve `Profile`. Buradaki tasarım adaya bırakılmıştır ancak var olan tasarımla uyumlu olması beklenmektedir.
- `#Exlore` sayfası postları etiketler aracılığıyla bulmak ve göstermek içindir.
- `Bookmarks` daha önce beğenilen postları listelemek içindir.
- `Profile` daha önce kişi tarafından paylaşılmış postları listelemek içindir.
- Bu sayfalar arasında dolaşabilmek istiyoruz.
- `Bookmarks` ve `Profile` sayfalarının içeriklerinin `redux` (`redux`, `redux-toolkit` farketmez) ile yönetilmesi beklenmektedir. Bir post'u beğendiğimizde ya da yeni bir post yayınladığımızda bunların redux'a kayıt edilmesi ve gerektiğinde de redux'tan çekilip gösterilmesi gerekmektedir.
- `Ana sayfa` bir akış ekranıdır. Postlar burada en güncel olandan, en eski olana doğru listelenmelidir. Post'a tıkladığımızda bu post'a yapılmış yorumları görebilmeliyiz.
- Bu ekranın verisi `data` klasörünün altındaki `post_dataset.json` dosyasına dayanmalıdır. Bir fake json API oluşturulup (`json-server` kütüphanesi kullanılabilir) bu sunucuya istek atılarak veriler çekilmelidir.
- `Ana sayfa`da geliştirilmesi beklenen bir diğer işlevsellik ise `Search`'dür. Yazmayı bitirdikten yaklaşık `1500ms` sonra post içerikleri arasında yazılan kelime/cümle aranmalı ve böyle bir içerik mevcutsa akış içerisindeki veriler ile bunlar yer değiştirmelidir. `Search` boşsa akış gösterilmelidir.

Community içerisinde geliştirilen tüm kütüphaneler kullanılabilir. Kullanılması zorunlu olan paketler: `nextjs`, `redux`, `typescript` ve `json-server`'dır.

> Projeyi teslim ederken dikkat etmen gereken en önemli şey `eslint` komutunun çalışması ve projenin başarılı bir şekilde `build` almasıdır.
> Sizinle paylaştığımız dosyalar sorunsuz olmayabilir. Şüpheci olup karşılaşılabilecek problemleri de çözmenizi bekliyoruz.

## Daha İyi Ne Olabilir?

- Bileşenlerin, Sayfaların vd. testleri olabilir. Eğer aşinaysan belki bunları bir AI tool'u kullanarak bile yazdırabilirsin! Buna çok mutlu oluruz ^^
- Yazdığın kodu dokümante edebilirsin.
- Karşılaştığın zorlukları bizimle paylaşabilir ve bunlara nasıl çözümler getirdiğini anlatabilirsin.
- Çözüm getiremediğin sorunlar mı var? O zaman bunlar için nasıl araştırmalar yaptın çözmek için hangi adımları izledin, detaylıca bizimle paylaşabilirsin.
- Çalışma programını bizimle paylaşabilirsin. Biliyoruz ki aynı zamanda eğitimine devam ediyorsun. Zamanı yönetmek o kadar da kolay bir iş değil. Zaman yönetimi bizim için de kritik bir öneme sahip. Bu disiplin seni değerlendirirken belki bize de ufak bir fikir verebilir.

## Vercel'e Yükleme ve Teslim

Proje'nin zip dosyasını indirdikten sonra githubda 'initial commit' commiti ile yüklenmesi gerekmektedir, daha sonra proje üzerinde çalışmaya başlanmalıdır. Geliştirmeler main branchten farklı bir branchte yapılmalı son aşamada pull request ile birleşltirilmelidir. Geliştirmeler bittikten sonra github reposu `muhammeddeniz`, `bahtiyarerden` ve `baris-karan` paylaşılmalıdır.

Next.js uygulamasını yüklemenin en basit yolu [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) platformunu kullanmaktır.

Projenin Vercel'e yüklenerek eğer varsa projeye dair notlarınla birlikte preview linkinin de README.md dosyasına koyulmasını bekliyoruz. Aşağıdaki alan senin için!

## Notlar ve Linkler

### Karşılaştığım Zorluklar
1. **Eksik Veriler:**
   - `post_dataset.json` dosyasında `display_name` ve `user_avatar` gibi alanlar eksikti.
2. **Hatalı Linkler:**
   - Tüm Unsplash linkleri 404 hatası dönüyor, bu da görsellerin yüklenememesine neden oluyordu.
3. **Redux Entegrasyonu:**
   - Redux ile state yönetimi yaparken, bazı bileşenlerin güncellenmesi gerekti. Bu, bileşenlerin yeniden render edilmesi sırasında sorunlara yol açtı.

### Çözümlerim
1. **Eksik Verilere Dinamik Varsayılan Değerler Atadım:**
   - `display_name` eksik olduğunda "Anonymous User", `avatar` eksik olduğunda varsayılan bir avatar resmi atandı.
2. **Hatalı Linkler İçin Alternatif Görsel Kaynakları Kullandım:**
   - Unsplash yerine başka bir görsel kaynağı kullanarak görsellerin yüklenmesini sağladım.
3. **Redux Entegrasyonunu Geliştirdim:**
   - Redux store'unu güncelleyerek bileşenlerin doğru bir şekilde yeniden render edilmesini sağladım. Ayrıca, bileşenlerin `useSelector` ve `useDispatch` hook'larını doğru bir şekilde kullandım.

Projede **infinite scroll** ve **lazy loading** yapıları uygulandı:

- **Infinite Scroll:** Sayfanın altına yaklaşıldıkça API'den yeni postlar otomatik olarak yüklenir. Bu, başlangıçta tüm verilerin yüklenmesini engelleyerek performansı artırır.
- **Lazy Loading:** Görseller yalnızca kullanıcı tarafından görüntülendiğinde yüklenir, böylece sayfa yükleme süresi ve bant genişliği tüketimi optimize edilir.

Bu yöntemler sayesinde proje, daha hızlı ve kullanıcı dostu bir deneyim sunar.

`post_dataset.json` dosyasında eksik (display_name ve avatar image linki 
mevcut değildi) veya Unsplash linkleri 404 dönüyordu. 

Veri setindeki https://source.unsplash.com/random/620x440?istanbul gibi linklerden `extractQueryParam` fonksiyonuyla keywordu (örneğin, istanbul) çıkardım ve Unsplash API'sine dinamik olarak bağlandım. Bu yöntemle hatalı veya eksik görseller yerine doğru görselleri runtime'da çektim. Ancak, her görsel için ayrı API çağrısı yapmak performans maliyeti yaratabilir ve kullanıcı deneyimini olumsuz etkileyebilir.

Unsplash API görsellerinin kullanımı demo proje için 50 respone/hour'a kadar sınırlı olması sebebiyle, görsel içerikler yerine `skeleton yapısı` kullanmayı tercih ettim. Bu sayede, görseller yüklenirken kullanıcıya bir placeholder (yer tutucu) gösterilerek sayfanın daha hızlı ve akıcı bir şekilde render edilmesi sağlandı. Skeleton yapısı, hem görsel kaynak sorunlarını çözdü hem de kullanıcı deneyimini iyileştirdi.

Her kullanıcı için unique olan `username` değerini kullanarak bir random avatar API bağlantısı kurarak çözdüm. Bu sayede her kullanıcı için benzersiz ve rastgele bir avatar görüntüsü elde edildi.

* `post_dataset.json`'i değiştirmeyi tercih etmedim çünkü veri kaynağını değiştirmek, gelecekteki güncellemelerle uyumluluğu zorlaştıracağını ve bakım maliyetini artıracağını düşündüm.  

* Vercel'a deploy ederken `json-server`'i `json-server-vercel` formatında clone proje biçimde deploy edip ana repo ile bağlantısını sağladım.

## Çalışma Programım Hakkında

Projeye, final haftamla çakışması nedeniyle teslim tarihine 36 saat kala yoğun bir şekilde odaklanabildim. Zaman yönetimiyle sınırlı bir sürede elimden gelenin en iyisini yaparak projeyi tamamladım.

### Preview Linkleri

- **Client:** [https://doggo-react-web-task-gi4p.vercel.app/](https://doggo-react-web-task-gi4p.vercel.app/)
- **DB Server:** [https://doggo-json-server.vercel.app/posts](https://doggo-json-server.vercel.app/posts)
