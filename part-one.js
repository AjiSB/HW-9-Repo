function Shape(n, ns){
	this.name = n;
	this.numSides = ns;
}

function Rectangle(h, w, n){
    this.height = h;
    this.width = w;
    this.area = function(){
        return this.height * this.width;
    }
    
    this.perimeter = function(){
        return 2*this.height + 2*this.width; 
      }
    Shape.call(this, n, 4);
}


function Square(h, n){
    Rectangle.call(this, h, h, n)

}

Rectangle.prototype = Object.create(Shape.prototype);

Square.prototype = Object.create(Rectangle.prototype);

var myRectangle = new Rectangle(7, 5, "R1");
console.log(myRectangle.area());
console.log(myRectangle.perimeter());

var mySquare = new Square(5, "S1");
console.log(mySquare.area());
console.log(mySquare.perimeter());
