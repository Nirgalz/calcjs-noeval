
$(document).ready(function(){
    
    
    //associative array which will host all the values and actions
    result = {
        number1:'',
        number2:'',
        result:null,
        action:''
    };
    
    previousResult = 0;
    
    
    //function to populate listeners on touch inputs
   function populateListeners() {
        $(".calcTouch").each(function(){
            $(this).on('click', function(){
                var userInput = $(this).text();
                
                if (isNaN(parseInt(userInput))) {
                    if (userInput == '.') {
                        calculate('.', 'number')
                    } else {
                        calculate(userInput, 'action');
                    };
                } else {
                    calculate(userInput, 'number')
                };
                resultScreen();

            });
        });
        
        $("#reset").on('click', function(){
            $("#result").html('0');
            resetCalc();
        })
    }
    
    populateListeners();
   
   // function to calculate depending on the inputs
   function calculate(inputCalc, inputType) {
       //will populate action var with action type
       if (inputType == 'action' && inputCalc !='=') {
           
           if (result.number1 == '') {
               result.number1 = previousResult;
           };
           
           result.action = inputCalc;
           //if action is '=', calculates the result
       } else if (inputType == 'action' && inputCalc == "=" ) {
           var n1 = parseFloat(result.number1);
           var n2 = parseFloat(result.number2);
           
          switch (result.action) {
                case '-':
                  result.result = n1 - n2;
                  break;
                case '+':
                    result.result = n1 + n2;
                    break;
                case '*':
                    result.result = n1 * n2;
                    break;
                case '/':
                    result.result = n1 / n2;
                    break;
          };
           resultScreen();
           previousResult = result.result;
           
           //history of calculations
           $('#history').append('<tr><td id="result"></tr>');
           
           $('#result').removeAttr('id');
           resetCalc();
           //if no action has been defined, will populate number1 var
       } else if (inputType == 'number' && result.action == '') {
           // if user inputs a dot, also manages case where user tries
           // to input two dots in one number
           if (result.number1.includes('.') && inputCalc == '.'){
           //do nothing
           } else {
                result.number1 += inputCalc;
           }
           //if an action is defined, number2 is populated
       } else if (inputType == 'number' && result.action != '') {
           if (result.number2.includes('.') && inputCalc == '.'){
           //do nothing
           } else {
                result.number2 += inputCalc;
           }
       }
   }
   
   // resets the calculator
   function resetCalc() {
       result = {
        number1:'',
        number2:'',
        result:null,
        action:''
    };
   }
   
   
   // shows data on screen
   function resultScreen() {
       
        if ( result.result == null) {
            var resultValues = result.number1 + result.action + result.number2;
        } else {
            var resultValues = result.number1 + result.action + result.number2 + " = " + result.result;
        } 
        $("#result").html(resultValues);
   }
   
   //events on keyboard use on input
   // will only show (and take into account) relevant inputs
   $(":root").on( "keypress", function( event ) {
       //gets actual value
       var pKey = String.fromCharCode(event.which);
       //if input is 'enter', gets result
       if (event.which == 13) {
           calculate('=', 'action');
       };
       //will isolate numbers, actions and will not take into account keys which are not relevant (letters, etc)
       if (isNaN(parseFloat(pKey)) && chKey(pKey)) {
           calculate(pKey, 'action');
           resultScreen();
       }else if (isNaN(parseFloat(pKey)) == false){
           calculate(pKey, 'number');
           resultScreen();
       }
    });
   
   // function to verify if pressed key is in athorired keys var
   function chKey(key) {
       var auth = false;
       authorizedKeys = ['/','*','-','+','.']
       authorizedKeys.forEach(function(authKey){
           if (key == authKey) {
               auth = true;
           }
       })
       return auth;
   }
});
