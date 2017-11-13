const path = require('path')
const express = require('express')
const mongojs = require('mongojs')
const app = express()
const db = mongojs('akakom',['berita'])

app.use(express.static('angular'))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/',(req,res)=>{
    res.send('Silakan menuju halaman API dengan cara <a href="/api">Klik di sini</a>!')
})

app.get('/api',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.get('/api/berita',(req,res)=>{ 
    db.berita.find({},{},function(err, berita){
        var response = {
            message:'Berita berhasil diambil',
            data:berita,
            status:'ok'
        }

        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(response, null, 4));
    })
})

app.get('/api/berita/:slug',(req,res)=>{ 
    var slug = req.originalUrl.split('/berita/')[1]
    if(slug == 'slug'){
        res.sendFile(path.join(__dirname,'berita-sluglist.html'))
    }
    else
        db.berita.findOne({slug},function(err, berita){
            var response = {
                message:'Berita berhasil diambil',
                data:berita,
                status:'ok'
            }

            res.json(response)
        })
})

app.listen(8008,()=>{
    console.log('Server berjalan pada http://localhost:8008/')
})

// db.berita.insert({
//   judul:"Pelatihan dan Sosialisasi Program Kegiatan Mahasiswa (PKM)",
//   author:'admin',
//   waktu:ISODate(),
//   slug:'pelatihan-dan-sosialisasi-program-kegiatan',
//   isi:`Program Kegiatan Mahasiswa (PKM) merupakan kegiatan yang diselenggarakan setiap tahun oleh Direktorat Jenderal Pendidikan Tinggi Kementerian Riset, Teknologi, dan Pendidikan Tinggi Republik Indonesia (Kemenristekdikti RI).
//   Kegiatan Pelatihan dan Sosialisasi Program Kegiatan Mahasiswa (PKM) yang dilaksanakan pada hari Jumat, 22 September 2017, pukul 08.00 hingga selesai di Ruang Presentasi STMIK AKAKOM Yogyakarta. Kegiatan ini diselenggarakan oleh kepuketan 3 bidang kemahasiswaan. Sosialisasi ini diikuti oleh sekitar 80 mahasiswa STMIK AKAKOM. Sedangkan narasumber dari kegiatan ini yaitu dari Reviewer PKM Dikti yaitu Bapak Eko.
//   Tujuan dari kegiatan sosialisasi ini yaitu untuk memberikan penjelasan mengenai apa itu pkm dan tata cara penulisan pembuatan proposal pkm sebagai bekal bagi mahasiswa yang akan mengikuti pm pendanaan tahun 2018 mendatang. Diharapkan dari kegiatan ini mahasiswa dapat memahami tentang tata cara pembuatan proposal dan dapat memotivasi untuk mengikuti pkm pendanaan tahun 2018.`
// })