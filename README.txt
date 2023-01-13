1. How To Launch To_Do_List

Once you downloaded and unzipped the folder, install all the libraries with the following command in the correct location. 
-- npm install
This command will install all required libraries.

After installing all the required libraries, you can run the software with the following command.

-- npm run test
OR
-- node server.js 

If you wonder how to set up with node, check this link (46 min~): https://canvas.umn.edu/courses/332932/external_tools/24

------------------------------------------------------------------------------------------------
1-1. CSE Lab Machine

The software is now ready to operate after the above commands succeeded.

(If the port is occupied, try other port numbers.)


1-2. Local Computer

If a user wishes to run the software on the local machine, the user should be logged in on CSELabs machine.
Hence, by using the following commands, a user can do port forwarding.
(Refer to this link: https://cse.umn.edu/cseit/self-help-guides/secure-shell-ssh)

-- ssh -L 127.0.0.1:3306:cse-mysql-classes-01.cse.umn.edu:3306 <your umn id>@csel-kh1250-37.cselabs.umn.edu

Once logged in successfully, change host line 8 in db.js (host: "127.0.0.1").

If successfully done, you will be able to run the software with the following command.
-- npm run test
OR
-- node server.js 

------------------------------------------------------------------------------------------------

2. Database

A username and password of the database are in the db.js file in lines 10-11.

If someone wants to access/change the database, use the following command after logging in to CSELabs machine.
-- mysql -uC4131F22U53 -hcse-mysql-classes-01.cse.umn.edu -P3306 C4131F22U53 -p

Type admin for the password. (password: admin)

3. How To_Do_List performs:
Once you run the software, you can access "http://localhost:3006/" OR with "http://localhost:3006/main" on your browser.

The software mainly does the following operations.

1) All existing todo-items will be shown on /main.

2) User can add To_Do item(s) with "add" button. 

3) User can delete To_Do item(s) with "delete" button .

4) User can mark/unmark the checkbox (referring as done/undone) without reloading.

5) Filter To_Do item(s) depending on all/active/done with the "filter" button.


4. Above and Beyond
- As the users mark/unmark the checkbox in each To_Do item, the background color of that item changes.
- If the due date of the To_Do item has passed, the text of the due date is colored red.
- Sorted To_Do items by the due date by increasing order.
- On hovering the buttons, the button rotates by one degree and a green shadow has applied.

(If necessary....)
- To facilliates on various size, To_Do_item(s) resize depending on the screen size.
- The calendar was used as text on the due date.
- Error message shows up when a user does not fill in all input fields (text input for the To_Do item title/date input for due date).