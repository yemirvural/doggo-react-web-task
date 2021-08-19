# Task Senaryosu

### Baslangic

- Projeyi clonelayin
- proje ana dizininde asagidaki komutlari calistirin

```sh
yarn install
```

```sh
yarn start
```

</br></br>

### Gereklilikler

- Ismi girilen kullanicinin github profil bilgisi ve altinda github repositorylerinin listelenmesi
- kullanicinin profil bilgisi olarak asagidaki bilgilerin gosterilmesi beklenmektedir
  - name
  - location
  - company
  - avatar_url
  - public_repos
  - followers
  - following
- ismi girilen github kullanicisinin public repositorylerinin ‘created_at’ degerine gore listelenmesi
- listelenen repository kart larinda bulunmasi gereken bilgiler
  - repository ismi
  - created_at zamani
  - repo cart in uzerine url repository url koyulmasi
  - Repository dili
  - Favori butonu
- Her bir repository nin sağ üstünde yıldız ikonuna basıldığında favoriye eklenebilir olması
- favoriye eklenmis bir repositoryde favoriye eklendigi icon olarak degismesi beklenmektedir.
- Favoriye eklenmiş repository nin yildiz icon una basıldığında favorilerden silinmesi
- Favoriden çıkarılmış bir repository icon un başlangıç haline geri dönmesi beklenmektedir.
- Sayfanın sağ üstünde bulunan favori repolar butonuna basıldığında
- Favori olan kaydedilmiş repository lerin listelenmesi beklenmektedir.
- vercel deploy edilmesi

<br /><br />

### Endpointler

<table>
<tr>
<th>Islem</th>
<th>URL</th>
</tr>

 <tr>
    <td>profile bilgisi getirmek icin</td>
    <td>https://api.github.com/users/{KULLANICI_ADI}</td>
  </tr>
  <tr>
    <td>profile ait repolari getirmek icin</td>
    <td>https://api.github.com/users/{KULLANICI_ADI}/repos</td>
  </tr>
</table>

<b>NOT: </b> "{{KULLANICI ADI}}", Profil bilgisi veya reposu istenilen kullanici ismine karsilik gelmektedir.

<br /><br />

### ONEMLI NOTLAR

- Functional component kullanilmali (onemli)
- Redux kullanilmali ( en azindan redux setupi yapilmis olmali )
- Redux baglantisi hooklar ile yapilmali (orn: useSelector, useDispatch)
- Stillendirme icin hazir kutuphane kullanilabilir. (orn: chakraui, bootstrap)
- Axios api call icin kullanilabilir
- React router dom Sayfa yonlendirmeleri icin kullanilmali.
- react-vertical-timeline-component ile zaman dilimine gore sortlanmasi (repolar listelenirken kullanilabilir)

<br/></br>

<b>BAŞARILAR...</b>
</br>

## License

MIT © [DogGO](https://github.com/doggo-frontend)
