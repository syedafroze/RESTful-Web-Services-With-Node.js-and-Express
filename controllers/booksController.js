function booksController(Book){

function post(req,res){
    const book= new Book(req.body);
  //saves in DB
    console.log(book);
    if(req.body.title==undefined){
      res.status(400);
      return res.send('Title is required');
    }
    res.status(201);
    book.save();
    return res.json(book);
  }
  function get(req,res){
    const {query} = req;
    console.log(query)
    Book.find(query,(err,books) => {
      console.log("books",books)
      if(err){
       return  res.send(err);
      }
      const returnBooks= books.map((book)=>{
        const newBook = book.toJSON();
        console.log("book",newBook)

        newBook.links={};
        newBook.links.self=`http://${req.headers.host}/api/books/${book._id}`;
        return newBook;
      })
      //  return  res.json(books);
              return  res.json(returnBooks);

    });
  }
  return {post,get}
}
module.exports=booksController
