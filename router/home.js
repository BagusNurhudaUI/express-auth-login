const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.send("berhasil masuk ke home get 22sdsda")
    
})

module.exports = router;