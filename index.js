const PORT = 8000
const express = require('express')
const axios = require('axios').default
const cheerio = require('cheerio')


const app = express()

const url = "https://shop.rebag.com/collections/all-bags?_=pf&pf_st_availability_hidden=true&pf_t_categories=bc-filter-Bags"

//app.METHOD(PATH, HANDLER)
//app.get() - get
//app.post() - add
//app.put() - edit
//app.delete() - delete data

app.get('/', function (req, res) {
    res.json('This is my webscrapper')
})

app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            const bags = []


            $('.product-caption', html).each(function () {
                const brand = $(this).find('.product-vendor').text()
                const title = $(this).find('.product-title').text()
                const price = $(this).find('.product-price').text()
                const url = $(this).find('a').attr('href')

                bags.push({
                    brand,
                    title,
                    price,
                    url
                })
            })
            res.json(bags)
        }).catch(err => console.log(err))
})



app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

