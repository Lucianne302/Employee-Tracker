INSERT INTO department (deptName)
VALUES
  ('Customer Service'),
  ('Marketing'),
  ('Finance'),
  ('Legal'),
  ('HR'),
  ('IT');

INSERT INTO roles (job_title, salary, department_id)
VALUES
  ('Promotions Rep', 3000.00, 2),
  ('Sales Asso', 1600.00, 2),
  ('Customer Service Manager', 6000.50, 1),
  ('Accountant', 5000.00, 3),
  ('IT', 10000.00, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'McDonald', 2, 3),
  ('Virginia', 'Test', 1, 3),
  ('Mike', 'Ike', 5, 1),
  ('Stuart', 'Fraser', 5, 1);
  