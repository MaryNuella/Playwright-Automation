import { test, expect } from '@playwright/test';
import vendorAdminn from "../vendorAdmin-Admin-ManageUsers.json" assert { type: "json" };
import { faker } from "@faker-js/faker";
import {Login} from '../Page Object Model/login'; 
import { vendorAdmin } from '../Page Object Model/vendorAdmin';
import { makeAlias } from '../Utils/splitEmailDomain';

test.describe("What happens after a successful login", async () => {

for(const data1 of vendorAdminn){
  test(`Test case scenario: ${data1.case}`, async ({page}) => {
    const alphaSuffix = faker.string.alpha(2); 
    const fourDigits = faker.string.numeric(2); 

   const uniqueEmail = makeAlias(data1.email); 

     console.log(uniqueEmail);
    const uniqueFirst = `${data1.firstName}${alphaSuffix}`; 

    const l = new Login(page);
    const vm = new vendorAdmin(page);

    await l.goToLoginPage();
    await l.login(process.env.validEmail, process.env.validPassword);
    await vm.navigateToUsers(uniqueFirst, data1.lastName, uniqueEmail, data1.phoneNumber);



    if(data1.expectedMessage){

const errorLocator = expect(page.getByRole('paragraph'));

if (Array.isArray(data1.expectedMessage)) { 
          for (const msg of vendorAdminn.expectedMessage) { 

              await expect(errorLocator).toContainText(msg); 
  
   }
        } else {
          await expect(errorLocator).toContainText(data1.expectedMessage); 
        }
  }else{
await expect(page).toHaveURL(new RegExp(data1.successUrlPattern, 'i'));
  }
  });

 

}



});