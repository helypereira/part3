const errorHandler = (error, response)=> {
console.error('Error:', error.message)
if (error.name=== 'CastError'){
return response.status(400).json({
error: 'Invalid ID format'
})
}
if (error.name=== 'ValidationError'){
return response.status(400).json({
error: error.message
})
}
if (error.name=== 'MongoServerError'&& error.code=== 11000){
return response.status(400).json({
error: 'Duplicate data'
})
}
// Generic error
response.status(500).json({
error: 'Internal Server Error'
})
}


export default errorHandler