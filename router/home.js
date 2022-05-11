const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.send("berhasil masuk ke page home")
    
})

module.exports = router;