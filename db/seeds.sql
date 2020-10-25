INSERT INTO role (role_id, job_title, department_id, salary)
VALUES
  ('1', 'Title 123', 2, 3000.00),
  ('1', 'Title 456', 3, 1600.00),
  ('3', 'Title 123', 8, 6000.50);

INSERT INTO employee (EeID, first_name, last_name, role_id, manager_id)
VALUES
  ('01', 'Ronald', 'McDonald', 2, 3),
  ('02','Virginia', 'Test', 1, 3),
  ('03', 'Mike', 'Ike', NULL, 1);
  
INSERT INTO department (department_id, deptName)
VALUES
  ('01', 'Customer Service'),
  ('02', 'Marketing');