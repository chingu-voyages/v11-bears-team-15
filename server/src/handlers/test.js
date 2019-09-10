exports.test = (req, res) => {
    console.log('test is running')
    return res.json({message: 'test is runnign'})
}