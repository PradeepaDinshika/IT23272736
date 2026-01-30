import { test, expect } from '@playwright/test';

/**
 * Data extracted from your "my one.xlsx" file.
 * Total scenarios: 35 (24 Positive, 10 Negative, 1 UI)
 */
const testData = [
  { id: 'Pos_Fun_0001', name: 'A simple sentence in past tense', input: 'Ammee mama bath kaevaa', expected: 'අම්මේ මම බත් කැවා' },
  { id: 'Pos_Fun_0002', name: 'Compound sentence', input: 'Api bath kamudha, Enna mama oyaata bath bedhala dhennam', expected: 'අපි බත් කමුද, එන්න මම ඔයාට බත් බෙදල දෙන්නම්' },
  { id: 'Pos_Fun_0003', name: 'A compound sentence with a suggestion', input: 'oyaa heta iskoole aave naethi unoth mama oyaath ekka tharaha venavaa', expected: 'ඔයා හෙට ඉස්කෝලෙ ආවෙ නැති උනොත් මම ඔයාත් එක්ක තරහ වෙනවා' },
  { id: 'Pos_Fun_0004', name: 'An interrogative (question) form', input: 'Mee api heta film ekak balanna yamudha?', expected: 'මේ අපි හෙට film එකක් බලන්න යමුද?' },
  { id: 'Pos_Fun_0005', name: 'A negative imperative (command)', input: 'oyaa aaye apee gedhara enna epaa', expected: 'ඔයා ආයෙ අපේ ගෙදර එන්න එපා' },
  { id: 'Pos_Fun_0006', name: 'A common greeting/wish', input: 'oyaata subama suba upandhinayak veevaa.', expected: 'ඔයාට සුබම සුබ උපන්දිනයක් වේවා.' },
  { id: 'Pos_Fun_0007', name: 'A request with polite emphasis', input: 'Anee heta apee gedhara ennakoo', expected: 'අනේ හෙට අපේ ගෙදර එන්නකෝ' },
  { id: 'Pos_Fun_0008', name: 'A positive response form', input: 'Harii, Mama ennam', expected: 'හරී, මම එන්නම්' },
  { id: 'Pos_Fun_0009', name: 'A polite phrasing for a request', input: 'Ane karunaakarala mata mee kaamaree pirisidhu karanna udhavuvenna puluvandha', expected: 'අනෙ කරුනාකරල මට මේ කාමරේ පිරිසිදු කරන්න උදවුවෙන්න පුලුවන්ද' },
  { id: 'Pos_Fun_0010', name: 'A polite phrasing for a request', input: 'Magee oluva ridhenavaa', expected: 'මගේ ඔලුව රිදෙනවා' },
  { id: 'Pos_Fun_0011', name: 'A repeated word expression for emphasis', input: 'Thanks thanks ', expected: 'Thanks thanks ' },
  { id: 'Pos_Fun_0012', name: 'A request form with high politeness', input: 'karunaakarala mata adha ooka evanavadha', expected: 'කරුනාකරල මට අද ඕක එවනවද' },  
  { id: 'Pos_Fun_0013', name: 'A paragraph-style multi-sentence input', input: 'ennaHeta apata online class thiyenava kiyala sir kivva. Oyaalatath eekata laesthivela enna kiyala prasanna sir ennakivva. eeka nisaa oyaala heta enakota phone eka hoo Lap eka mathaka aethuva aran enna. thava sir oyaalata kiyanna kivva dhavalta kanna kaeema ekakuth aran enna kivva. anivarenma oyaalage home works tika balanva kiyala poth aran ennakivva.', expected: 'එන්නහෙට අපට online class තියෙනව කියල sir කිව්ව. ඔයාලටත් ඒකට ලැස්තිවෙල එන්න කියල ප්‍රසන්න sir එන්නකිව්ව. ඒක නිසා ඔයාල හෙට එනකොට phone එක හෝ Lap එක මතක ඇතුව අරන් එන්න. තව sir ඔයාලට කියන්න කිව්ව දවල්ට කන්න කෑම එකකුත් අරන් එන්න කිව්ව. අනිවරෙන්ම ඔයාලගෙ home works ටික බලන්ව කියල පොත් අරන් එන්නකිව්ව.' },
  { id: 'Pos_Fun_0014', name: 'A slang/colloquial response', input: 'ela ela mama ehema karannam', expected: 'එල එල මම එහෙම කරන්නම්' },
  { id: 'Pos_Fun_0015', name: 'A sentence with units of measurement', input: 'Magee bara 50 kg thiyenavaa', expected: 'මගේ බර 50 kg තියෙනවා' },
  { id: 'Pos_Fun_0016', name: 'A sentence with currency format', input: 'Mata Rs. 100 k dhennakoo', expected: 'මට Rs. 100 ක් දෙන්නකෝ' },
  { id: 'Pos_Fun_0017', name: 'A simple present tense sentence', input: 'mama vaedata yanavaa', expected: 'මම වැඩට යනවා' },
  { id: 'Pos_Fun_0018', name: 'A sentence containing a date format', input: 'mama ipadhunee 2003/05/12 venidhaa', expected: 'මම ඉපදුනේ 2003/05/12 වෙනිදා' },
  { id: 'Pos_Fun_0019', name: 'A sentence containing a time format', input: 'Heta udhee 7.00 AM panthi patan gannava.', expected: 'හෙට උදේ 7.00 AM පන්ති පටන් ගන්නව.' },
  { id: 'Pos_Fun_0020', name: 'A sentence with English abbreviations', input: 'mata oyaage NIC number eka kiyannako', expected: 'මට ඔයාගෙ NIC number එක කියන්නකො' },
  { id: 'Pos_Fun_0021', name: 'A short imperative (command) form', input: 'vahaama enna', expected: 'වහාම එන්න' },
  { id: 'Pos_Fun_0022', name: 'A singular pronoun variation', input: 'mama rata yanavaa', expected: 'මම රට යනවා' },
  { id: 'Pos_Fun_0023', name: 'A plural pronoun variation', input: 'api yamu', expected: 'අපි යමු' },
  { id: 'Pos_Fun_0024', name: 'A future tense with embedded English words', input: 'mama tomorrow samaharavita shopping yaavii', expected: 'මම tomorrow සමහරවිට shopping යාවී' }, 
  { id: 'Neg_Fun_0001', name: 'An informal colloquial phrasing', input: 'Oya saniipen innava nedha halo', expected: 'ඔය සනීපෙන් ඉන්නව නේද හලො' },
  { id: 'Neg_Fun_0002', name: 'A multi-word expression (mata oona)', input: 'mata heta baasata kiyala print karan enna oonaane', expected: 'මට හෙට බඅසට කියල print කරන් එන්න ඕනානෙ' },
  { id: 'Neg_Fun_0003', name: 'A stress test for repeated/long expressions', input: 'maaaadhariyee mage aadhariyee kavurundha sukumaala sundhariyee sadha raajiniyee sadha raajiniyee nuo kavurundha kavurundha aadhariyee', expected: 'මාආදරියේ මගෙ ආදරියේ කවුරුන්ද සුකුමාල සුන්දරියේ සද රාජිනියේ සද රාජිනියේ නුඔ කවුරුන්ද කවුරුන්ද ආදරියේ' },
  { id: 'Neg_Fun_0004', name: 'A sentence with punctuation and English terms', input: 'oya "the apple" paavichchi karee aeyi?', expected: 'ඔය "the apple" පාවිච්චි කරේ ඇයි?' },
  { id: 'Neg_Fun_0005', name: 'A question containing punctuation', input: 'paeni rasa musuunu rasak oyatath dhanenavadha ?', expected: 'පැනි රස මුසුඋනු රසක් ඔයටත් දනෙනවද ?' },
  { id: 'Neg_Fun_0006', name: 'A missing spaces/joined words stress test', input: 'Hetaapikohedhayanne', expected: 'හෙටඅපිකොහෙදයන්නෙ' },
  { id: 'Neg_Fun_0007', name: 'A day-to-day expression of gratitude', input: 'Ane dhuve oyaata pin sidhdha venava mee sathaata kanna dhunna nisaa', expected: 'අනෙ දුවෙ ඔයාට පින් සිද්ද වෙනව මේ සතාට කන්න දුන්න නිසා' },
  { id: 'Neg_Fun_0008', name: 'A single word imperative form', input: 'waadiwenna', expected: 'වාඩිවෙන්න' },
  { id: 'Neg_Fun_0009', name: 'A question in plural form', input: 'haritha udhdhyaanaya balanna yamudha?', expected: 'හරිත උද්ද්‍යානය බලන්න යමුද?' },
  { id: 'Neg_Fun_0010', name: 'A question with an embedded technical term', input: 'oya kohenda oya phoneeka gaththe?', expected: 'ඔය කොහෙන්ඩ ඔය phoneඑක ගත්තෙ?' },
  { id: 'Pos_UI_0001', name: 'Clear input field', input: 'After clearing, input is empty', expected: 'After clearing, input is empty' }
];

test.describe('IT3040 Assignment: Swift Translator Automation', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the translator and wait for it to load
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
  });

  
  for (const scenario of testData) {
    if (scenario.id == 'Pos_UI_0001') {

      test(`${scenario.id}: ${scenario.name}`, async ({ page }) => {
        const inputArea = page.getByPlaceholder("Input Your Singlish Text Here.");
        const outputArea = page.locator('div.bg-slate-50');

        // 1. Fill the input first to ensure there is something to clear
        await inputArea.fill('Ammee mama bath kaevaa');

        await page.waitForTimeout(5000); 
    
        // 2. Click the Clear button using the aria-label
        await page.getByText('🗑️ Clear').click();

        // 3. Verify Input field is empty
        // Textareas use .inputValue()
        await expect(inputArea).toHaveValue('');

        // 4. Verify Output field is empty
        // Divs use .toHaveText()
        await expect(outputArea).toHaveText('');
    
        console.log(`${scenario.id}: UI Clear Successful - Both fields are empty.`);
      });


    } else{
      test(`${scenario.id}: ${scenario.name}`, async ({ page }, testInfo) => {
        // 1. Identify Input and Output fields
        // Based on the site structure, we find the first and last textareas
        const inputArea = page.getByPlaceholder("Input Your Singlish Text Here.");
        const outputArea = page.locator('div.bg-slate-50');

        // 2. Perform actions
        await inputArea.fill(scenario.input);
        
        // 3. Wait for real-time conversion (Brief delay for JS to run)
        await page.waitForTimeout(5000); 

        // 4. Capture Actual Output
        const actualOutput = await outputArea.innerHTML();

        // 5. Log for Excel Reporting
        console.log(`TC ID: ${scenario.id}`);
        console.log(`Actual Output: ${actualOutput}`);

        // 6. Attach to report for easy copying
        testInfo.annotations.push({
          type: 'Actual Output (Sinhala)',
          description: actualOutput
        });

        await expect(outputArea).toHaveText(scenario.expected);

        // // 7. Verify Result (Assertions)
        // // Note: Negative scenarios might fail this assertion, which validates the "Failure"
        // if (scenario.id.startsWith('Pos')) {
          
        // } else {
        //   // For Negative scenarios, we expect some inconsistency or capture the bug
        //   console.warn(`[NEG] ${scenario.id} captured result: ${actualOutput}`);
        // }
      });
    }
  }
  
});