
/**
 * DuplicateCreditTypeFault.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis2 version: 1.5.1  Built on : Oct 19, 2009 (10:59:00 EDT)
 */

package edu.fiu.cis.acrl.quotasystem.ws;

public class DuplicateCreditTypeFault extends java.lang.Exception{
    
    private edu.fiu.cis.acrl.quotasystem.ws.DuplicateCreditTypeError faultMessage;

    
        public DuplicateCreditTypeFault() {
            super("DuplicateCreditTypeFault");
        }

        public DuplicateCreditTypeFault(java.lang.String s) {
           super(s);
        }

        public DuplicateCreditTypeFault(java.lang.String s, java.lang.Throwable ex) {
          super(s, ex);
        }

        public DuplicateCreditTypeFault(java.lang.Throwable cause) {
            super(cause);
        }
    

    public void setFaultMessage(edu.fiu.cis.acrl.quotasystem.ws.DuplicateCreditTypeError msg){
       faultMessage = msg;
    }
    
    public edu.fiu.cis.acrl.quotasystem.ws.DuplicateCreditTypeError getFaultMessage(){
       return faultMessage;
    }
}
    