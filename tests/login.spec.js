import { test, expect } from '@playwright/test';
import login from "../login.json" assert { type: "json" };
import {Login} from '../Page Object Model/login'; 


test.describe("Test the Login Page of some site", async () => {

for(const data1 of login){; 
  test(`Test Case Scenario: ${data1.case}`, async ({page}) => {
    const l = new Login(page)

    await l.goToLoginPage();
    await l.login(data1.email,data1.password);


     if(data1.expectedMessage){

const errorLocator = page.locator(".font-display");

if (Array.isArray(data1.expectedMessage)) { 
          for (const msg of login.expectedMessage) { 

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