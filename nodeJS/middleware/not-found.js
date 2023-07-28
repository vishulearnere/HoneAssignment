// If the URL is wrong

const notFound = (req, res) => {
    res.status(404).send('Resource is not found, Please Try Again')
}

module.exports = notFound