-- ToDoList table. I've created this for you.
create table ToDoList (
    id int not null auto_increment,
    todo varchar(150) not null,
    dueDate date not null,
    status int not null default 0,
    primary key(id)
);

-- Add data
-- Insert into ToDoList (todo, dueDate) values ('CSCI4131_Project', '2022-12-19');

-- Get data
-- select * from ToDoList;