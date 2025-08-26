import { test, expect } from '@playwright/test';
import signupCorpAcct from "../signupCorpAcct.json" assert {type:"json"}
import { signupCorpAccount } from '../Page Object Model/signupCorpAcct';
import { getLatestEmailData } from '../Gmail-Email-Helper/gmailEmailHelper';


test.describe("jj",()=>{

for(const data1 of signupCorpAcct){
test(`SignupCorporateAcct: ${data1.case}`, async ({ page }) => {

    const suca = new signupCorpAccount(page)

await suca.goToLoginPage()

await suca.signup(data1.firstName,data1.lastName,data1.email,data1.phone,data1.businessName,data1.streetName,data1.buildingNumber,data1.city,data1.RcNumber,data1.password,data1.retypePassword)


  const emailData = await getLatestEmailData(100000);
  if (!emailData.link)throw new Error("Verification link not found in Gmail email");
  console.log("Link:", emailData.link);
  await page.goto(emailData.link);
  await suca.loginAfterSignup()


if (data1.expectError) { 
        const errorLocator = page.locator(".font-display"); 
        if (Array.isArray(data1.expectedMessage)) { 
          for (const msg of data1.expectedMessage) { 
            await expect(errorLocator).toContainText(msg); 
          }
        } else {
          await expect(errorLocator).toContainText(data1.expectedMessage); 
        }
      } else { 

        await expect(page).toHaveURL(new RegExp(data1.successUrlPattern, 'i')); 
      }

});
}
})