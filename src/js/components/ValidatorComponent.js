import React from 'react';
import { ValidatorComponent } from 'react-form-validator-core';
 
class TextValidator extends ValidatorComponent {
  errorText() {
        const { isValid } = this.state;
        if (isValid) {
            return null;
        }
         return (
             < p style={{ color: 'red',display : 'inline-block' }}>
               {this.getErrorMessage()}
            </p>
        );
    }
    render() {
      const { errorMessages, validators, requiredError, validatorListener, ...rest } = this.props;
       return (
        <td style={{fontSize: "14px", color: 'red', verticalAlign: "top"}} >
            <input
                {...rest}
                ref={(r) => { this.input = r; }}
            />
        {this.errorText()}
        </td>
        );
    }
}    
	
export default TextValidator;
