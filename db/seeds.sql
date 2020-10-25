INSERT INTO department (deptName)
VALUES
  ('Customer Service'),
  ('Marketing');

INSERT INTO roles (job_title, salary, department_id)
VALUES
  ('Title 123', 3000.00, 2),
  ('Title 456', 1600.00, 2),
  ('Title 123', 6000.50, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'McDonald', 2, 3),
  ('Virginia', 'Test', 1, 3),
  ('Mike', 'Ike', 5, 1);
  