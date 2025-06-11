// import {
//   departmentsPath,
//   employeesPath,
//   employeeTrainingPath,
//   trainingPath,
//   usersPath,
// } from "../routers/constants";
// import { Permission, Permissions } from "../types/users";

// function authorizeModules(
//   allowedModules: string[],
//   calledModule: string
// ): boolean {
//   const superUser = allowedModules.includes("all");
//   if (superUser) return true;

//   switch (calledModule) {
//     case departmentsPath:
//     case employeesPath:
//       return allowedModules.includes("employees");
//     case employeeTrainingPath:
//     case trainingPath:
//       return allowedModules.includes("statutory-training");
//     case usersPath:
//       return allowedModules.includes("users");
//     default:
//       return true;
//   }
// }

// function checkModulePermission(
//   modulePermissions: Permission,
//   method: string
// ): boolean {
//   if (modulePermissions.superUser) return true;

//   switch (method) {
//     case "get":
//       return modulePermissions.read || false;
//     case "post":
//       return modulePermissions.write || false;
//     case "put":
//       return modulePermissions.write || false;
//     case "delete":
//       return modulePermissions.delete || false;
//     default:
//       return false;
//   }
// }

// function authorizePermissions(
//   permissions: Permissions,
//   method: string,
//   calledModule: string
// ): boolean {
//   const superUser = permissions.all?.superUser;
//   if (superUser) return true;

//   switch (calledModule) {
//     case departmentsPath:
//     case employeesPath:
//       return checkModulePermission(permissions.employees, method);
//     case employeeTrainingPath:
//     case trainingPath:
//       return checkModulePermission(permissions.statutoryTraining, method);
//     case usersPath:
//       return checkModulePermission(permissions.users, method);
//     default:
//       return false;
//   }
// }

// export { authorizeModules, authorizePermissions };
