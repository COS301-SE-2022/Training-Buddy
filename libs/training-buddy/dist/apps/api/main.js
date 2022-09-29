/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const feature_1 = __webpack_require__("./libs/api/shell/feature/src/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
let AppModule = class AppModule {
};
AppModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [feature_1.ApiShellFeatureModule],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/api/src/main.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.api = exports.createNestServer = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./apps/api/src/app/app.module.ts");
const admin = __webpack_require__("firebase-admin");
const platform_express_1 = __webpack_require__("@nestjs/platform-express");
const express = __webpack_require__("express");
const functions = __webpack_require__("firebase-functions");
const data_access_1 = __webpack_require__("./libs/api/internal-api/repository/data-access/src/index.ts");
const cors = __webpack_require__("cors");
const corsOptions = {
    origin: '*',
    credentials: true,
    method: ["POST", "GET"],
    optionSuccessStatus: 200
};
const repo = new data_access_1.ApiInternalApiRepositoryDataAccessService();
const serviceAccount = __webpack_require__("./apps/api/src/training-buddy-2022-firebase-adminsdk-uine6-59d810bb2a.json");
const server = express();
const createNestServer = (expressInstance) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.DATABASE_URL,
    });
    const adapter = new platform_express_1.ExpressAdapter(expressInstance);
    const app = yield core_1.NestFactory.create(app_module_1.AppModule, adapter, { cors: true });
    app.enableCors();
    return app.init();
});
exports.createNestServer = createNestServer;
//create endpoint for webhook
server.post('/webhook', (req, res) => {
    console.log('webhook event received!', req.query, req.body);
    if (req.body.aspect_type == "create")
        if (req.body.object_type == "activity") {
            console.log("storing");
            console.log("logged object id: " + req.body.object_id);
            console.log("logged owner id: " + req.body.owner_id);
            repo.logStrava(req.body.object_id.toString(), req.body.owner_id.toString());
        }
    res.status(200).send('EVENT_RECEIVED');
});
//add support for GET requests to webhook
server.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = "STRAVA";
    console.log("get request received");
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.json({ "hub.challenge": challenge });
        }
        else {
            res.sendStatus(403);
        }
    }
});
(0, exports.createNestServer)(server)
    .then(v => console.log('Nest Ready'))
    .catch(err => console.error('Nest broken', err));
exports.api = functions.https.onRequest(server);
function bootstrap() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const globalPrefix = 'graphql';
        app.setGlobalPrefix(globalPrefix);
        const port = 3333;
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
        // //WEBHOOKS
        // //create http server and set port
        // const server = express().use(bodyParser.json) ;
        // server.listen(4040, () => console.log('webhook listening')) ;
    });
}
bootstrap();


/***/ }),

/***/ "./libs/api/example/api/feature/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/example/api/feature/src/lib/feature.module.ts"), exports);


/***/ }),

/***/ "./libs/api/example/api/feature/src/lib/feature.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeatureController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let FeatureController = class FeatureController {
    findAll() {
        return 'This action returns all examples';
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Get)(),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", String)
], FeatureController.prototype, "findAll", null);
FeatureController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)('example')
], FeatureController);
exports.FeatureController = FeatureController;


/***/ }),

/***/ "./libs/api/example/api/feature/src/lib/feature.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeatureModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const feature_controller_1 = __webpack_require__("./libs/api/example/api/feature/src/lib/feature.controller.ts");
let FeatureModule = class FeatureModule {
};
FeatureModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        controllers: [feature_controller_1.FeatureController],
    })
], FeatureModule);
exports.FeatureModule = FeatureModule;


/***/ }),

/***/ "./libs/api/internal-api/api/shared/interfaces/data-access/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/api-internal-api-api-shared-interfaces-data-access.module.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/user-dto.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/user.entity.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/login-response.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/login-input.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/error-message.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/activity-stat.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/user-stat-res.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/update-user.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/userconfig.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/activity-log.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/activity-schedule.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/response-logs.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/response-workout.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/metric.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/tokens.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/invite.ts"), exports);


/***/ }),

/***/ "./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/activity-log.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivityLog = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let ActivityLog = class ActivityLog {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ActivityLog.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ActivityLog.prototype, "activityType", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ActivityLog.prototype, "dateCompleted", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ActivityLog.prototype, "distance", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ActivityLog.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ActivityLog.prototype, "speed", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ActivityLog.prototype, "time", void 0);
ActivityLog = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], ActivityLog);
exports.ActivityLog = ActivityLog;


/***/ }),

/***/ "./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/activity-schedule.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivitySchedule = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let ActivitySchedule = class ActivitySchedule {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ActivitySchedule.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ActivitySchedule.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ActivitySchedule.prototype, "time", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ActivitySchedule.prototype, "activity", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ActivitySchedule.prototype, "location", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ActivitySchedule.prototype, "distance", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ActivitySchedule.prototype, "duration", void 0);
ActivitySchedule = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], ActivitySchedule);
exports.ActivitySchedule = ActivitySchedule;


/***/ }),

/***/ "./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/activity-stat.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivityStat = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let ActivityStat = class ActivityStat {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ActivityStat.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ActivityStat.prototype, "activity", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ActivityStat.prototype, "insight", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ActivityStat.prototype, "XP", void 0);
ActivityStat = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], ActivityStat);
exports.ActivityStat = ActivityStat;


/***/ }),

/***/ "./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/api-internal-api-api-shared-interfaces-data-access.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/user-dto.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/user.entity.ts"), exports);


/***/ }),

/***/ "./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/error-message.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorMessage = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let ErrorMessage = class ErrorMessage {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ErrorMessage.prototype, "message", void 0);
ErrorMessage = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], ErrorMessage);
exports.ErrorMessage = ErrorMessage;


/***/ }),

/***/ "./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/invite.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Invite = void 0;
const tslib_1 = __webpack_require__("tslib");
const response_workout_1 = __webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/response-workout.ts");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let Invite = class Invite {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], Invite.prototype, "sender", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(type => [String], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], Invite.prototype, "receivers", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof response_workout_1.ResponseWorkout !== "undefined" && response_workout_1.ResponseWorkout) === "function" ? _a : Object)
], Invite.prototype, "workout", void 0);
Invite = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], Invite);
exports.Invite = Invite;


/***/ }),

/***/ "./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/login-input.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginInput = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let LoginInput = class LoginInput {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], LoginInput.prototype, "username", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], LoginInput);
exports.LoginInput = LoginInput;


/***/ }),

/***/ "./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/login-response.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginResponse = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const user_entity_1 = __webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/user.entity.ts");
let LoginResponse = class LoginResponse {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], LoginResponse.prototype, "accessToken", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => user_entity_1.UserEntity),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _a : Object)
], LoginResponse.prototype, "user", void 0);
LoginResponse = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], LoginResponse);
exports.LoginResponse = LoginResponse;


/***/ }),

/***/ "./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/metric.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Metric = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let Metric = class Metric {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Metric.prototype, "lift", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Metric.prototype, "ride", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Metric.prototype, "run", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Metric.prototype, "swim", void 0);
Metric = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], Metric);
exports.Metric = Metric;


/***/ }),

/***/ "./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/response-logs.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseLogs = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let ResponseLogs = class ResponseLogs {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ResponseLogs.prototype, "user", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ResponseLogs.prototype, "activityType", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ResponseLogs.prototype, "dateComplete", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ResponseLogs.prototype, "distance", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ResponseLogs.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ResponseLogs.prototype, "speed", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ResponseLogs.prototype, "time", void 0);
ResponseLogs = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], ResponseLogs);
exports.ResponseLogs = ResponseLogs;


/***/ }),

/***/ "./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/response-workout.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseWorkout = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const user_entity_1 = __webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/user.entity.ts");
let ResponseWorkout = class ResponseWorkout {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ResponseWorkout.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ResponseWorkout.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ResponseWorkout.prototype, "startTime", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ResponseWorkout.prototype, "organiser", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(type => [user_entity_1.UserEntity], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], ResponseWorkout.prototype, "participants", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ResponseWorkout.prototype, "activityType", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ResponseWorkout.prototype, "startPoint", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ResponseWorkout.prototype, "proposedDistance", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], ResponseWorkout.prototype, "proposedDuration", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(type => [Boolean], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], ResponseWorkout.prototype, "complete", void 0);
ResponseWorkout = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], ResponseWorkout);
exports.ResponseWorkout = ResponseWorkout;


/***/ }),

/***/ "./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/tokens.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tokens = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let Tokens = class Tokens {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], Tokens.prototype, "stravaAccess", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], Tokens.prototype, "stravaRefresh", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Tokens.prototype, "exp", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], Tokens.prototype, "clientId", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], Tokens.prototype, "clientSecret", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], Tokens.prototype, "id", void 0);
Tokens = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], Tokens);
exports.Tokens = Tokens;


/***/ }),

/***/ "./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/update-user.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUser = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let UpdateUser = class UpdateUser {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateUser.prototype, "userName", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateUser.prototype, "userSurname", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateUser.prototype, "location", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateUser.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateUser.prototype, "oldemail", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateUser.prototype, "cellNumber", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateUser.prototype, "password", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], UpdateUser.prototype, "distance", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], UpdateUser.prototype, "longitude", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], UpdateUser.prototype, "latitude", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UpdateUser.prototype, "running", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UpdateUser.prototype, "riding", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UpdateUser.prototype, "swimming", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UpdateUser.prototype, "weightLifting", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateUser.prototype, "bio", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateUser.prototype, "gender", void 0);
UpdateUser = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], UpdateUser);
exports.UpdateUser = UpdateUser;


/***/ }),

/***/ "./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/user-dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let UserDto = class UserDto {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserDto.prototype, "userName", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserDto.prototype, "userSurname", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserDto.prototype, "location", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], UserDto.prototype, "longitude", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], UserDto.prototype, "latitude", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserDto.prototype, "stravaToken", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserDto.prototype, "gender", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserDto.prototype, "dob", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserDto.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserDto.prototype, "cellNumber", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserDto.prototype, "password", void 0);
UserDto = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], UserDto);
exports.UserDto = UserDto;


/***/ }),

/***/ "./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/user-stat-res.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserStatRes = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let UserStatRes = class UserStatRes {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserStatRes.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserStatRes.prototype, "activity", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserStatRes.prototype, "insight", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], UserStatRes.prototype, "XP", void 0);
UserStatRes = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], UserStatRes);
exports.UserStatRes = UserStatRes;


/***/ }),

/***/ "./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/user.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const metric_1 = __webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/metric.ts");
let UserEntity = class UserEntity {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "userName", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "userSurname", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "location", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], UserEntity.prototype, "longitude", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], UserEntity.prototype, "latitude", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "stravaToken", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "dob", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "gender", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "cellNumber", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "bio", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => metric_1.Metric, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof metric_1.Metric !== "undefined" && metric_1.Metric) === "function" ? _a : Object)
], UserEntity.prototype, "metrics", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(type => [String], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], UserEntity.prototype, "buddies", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(type => [Number], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], UserEntity.prototype, "ratings", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], UserEntity.prototype, "distance", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], UserEntity.prototype, "rating", void 0);
UserEntity = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], UserEntity);
exports.UserEntity = UserEntity;


/***/ }),

/***/ "./libs/api/internal-api/api/shared/interfaces/data-access/src/lib/userconfig.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Userconfig = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let Userconfig = class Userconfig {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], Userconfig.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Userconfig.prototype, "running", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Userconfig.prototype, "riding", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Userconfig.prototype, "swimming", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Userconfig.prototype, "weightLifting", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Userconfig.prototype, "distance", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], Userconfig.prototype, "bio", void 0);
Userconfig = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], Userconfig);
exports.Userconfig = Userconfig;


/***/ }),

/***/ "./libs/api/internal-api/api/training-buddy-api/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/api/training-buddy-api/src/lib/api-internal-api-api-training-buddy-api.module.ts"), exports);


/***/ }),

/***/ "./libs/api/internal-api/api/training-buddy-api/src/lib/api-internal-api-api-training-buddy-api.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiInternalApiApiTrainingBuddyApiModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const training_buddy_api_resolver_1 = __webpack_require__("./libs/api/internal-api/api/training-buddy-api/src/lib/training-buddy-api.resolver.ts");
const data_access_1 = __webpack_require__("./libs/api/internal-api/repository/data-access/src/index.ts");
const data_access_2 = __webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/index.ts");
const training_buddy_service_1 = __webpack_require__("./libs/api/internal-api/service/training-buddy-service/src/index.ts");
let ApiInternalApiApiTrainingBuddyApiModule = class ApiInternalApiApiTrainingBuddyApiModule {
};
ApiInternalApiApiTrainingBuddyApiModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        controllers: [],
        imports: [training_buddy_service_1.ApiInternalApiServiceTrainingBuddyServiceModule,],
        providers: [training_buddy_api_resolver_1.TrainingBuddyApiResolver, training_buddy_service_1.TrainingBuddyServiceService, training_buddy_service_1.LoginGuard, data_access_1.ApiInternalApiRepositoryDataAccessService, data_access_2.UserEntity],
        exports: [],
    })
], ApiInternalApiApiTrainingBuddyApiModule);
exports.ApiInternalApiApiTrainingBuddyApiModule = ApiInternalApiApiTrainingBuddyApiModule;


/***/ }),

/***/ "./libs/api/internal-api/api/training-buddy-api/src/lib/training-buddy-api.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TrainingBuddyApiResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const training_buddy_service_1 = __webpack_require__("./libs/api/internal-api/service/training-buddy-service/src/index.ts");
const data_access_1 = __webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_subscriptions_1 = __webpack_require__("graphql-subscriptions");
const pubsub = new graphql_subscriptions_1.PubSub();
let TrainingBuddyApiResolver = class TrainingBuddyApiResolver {
    /**
     *
     * @param trainingBuddyService
     */
    constructor(trainingBuddyService) {
        this.trainingBuddyService = trainingBuddyService;
    }
    /**
     *
     * @param userDTO
     * @returns UserEntity
     * tested
     */
    signup(userDTO) {
        return this.trainingBuddyService.signup(userDTO);
    }
    /**
     *
     * @param loginInput
     * @param context
     * @returns LoginResponse
     * tested
     */
    login(loginInput, context) {
        return this.trainingBuddyService.login(context.user);
    }
    /**
     *
     * @param Location
     * @returns Array of UserEntity
     * tested
     */
    //@UseGuards(JwtAuthGuard)
    findAll(email) {
        return this.trainingBuddyService.getAll(email);
    }
    getOne(email) {
        return this.trainingBuddyService.findOne(email);
    }
    /**
     *
     * @param update
     * @returns ErrorMessage
     */
    //@UseGuards(JwtAuthGuard)
    updateProfile(update) {
        return this.trainingBuddyService.updateUser(update);
    }
    /**
     *
     * @param userconfig
     * @returns ErrorMessage
     * tested
     *  */
    userConfig(userconfig) {
        return this.trainingBuddyService.userConfig(userconfig);
    }
    /**
     *
     * @param activityLog
     * @returns ErrorMessage
     * tested
     */
    activityLog(activityLog) {
        return this.trainingBuddyService.activityLog(activityLog);
    }
    /**
     *
     * @param activitySchedule
     * @returns ErrorMessage
     * tested
     */
    activitySchedule(activitySchedule) {
        const val = this.trainingBuddyService.activitySchedule(activitySchedule);
        const data3 = this.trainingBuddyService.getScheduleWorkout(activitySchedule.email);
        pubsub.publish("getAllWorkouts", { getAllWorkouts: data3 });
        return val;
    }
    getAllWorkouts() {
        const val = pubsub.asyncIterator("getAllWorkouts");
        return val;
    }
    sendRequest(userEmail, otherEmail) {
        const val = this.trainingBuddyService.sendRequest(userEmail, otherEmail);
        this.subscriptionsRequest(userEmail, otherEmail);
        return val;
    }
    /**
     *
     * @returns [userEntity]
     */
    getIncomingSub() {
        const val = pubsub.asyncIterator("getIncomingSub");
        return val;
    }
    /**
     *
     * @returns [userEntity]
     */
    getOutgoingSub() {
        const val = pubsub.asyncIterator("getOutgoingSub");
        return val;
    }
    /**
     *
     * @returns [UserEntity]
     */
    getConnectionsSub() {
        const val = pubsub.asyncIterator("getConnectionsSub");
        return val;
    }
    /**
     *
     * @param userEmail
     * @param otherEmail
     * @returns ErrorMessage
     * tested
     */
    reject(userEmail, otherEmail) {
        const val = this.trainingBuddyService.reject(userEmail, otherEmail);
        this.subscriptionsRequest(userEmail, otherEmail);
        return val;
    }
    /**
     *
     * @param userEmail
     * @param otherEmail
     * @returns ErrorMessage
     * tested
     */
    accept(otherEmail, userEmail) {
        const val = this.trainingBuddyService.accept(otherEmail, userEmail);
        this.subscriptionsRequest(userEmail, otherEmail);
        return val;
    }
    /**
     *
     * @param userEmail
     * @returns
     * tested
     */
    getIncoming(userEmail) {
        return this.trainingBuddyService.getIncoming(userEmail);
    }
    /**
     *
     * @param userEmail
     * @returns [userEntities]
     * tested
     */
    getOutgoing(userEmail) {
        return this.trainingBuddyService.getOutgoing(userEmail);
    }
    /**
     *
     * @param userEmail
     * @returns  [userEntities]
     * tested
     */
    getConnections(userEmail) {
        return this.trainingBuddyService.getConnections(userEmail);
    }
    /**
     *
     * @param userEmail
     * @returns
     * tested
     */
    getScheduleWorkout(userEmail) {
        return this.trainingBuddyService.getScheduleWorkout(userEmail);
    }
    /**
     *
     * @param workoutID
     * @returns
     */
    completeWorkout(workoutID, email) {
        return this.trainingBuddyService.completeWorkout(workoutID, email);
    }
    /**
     *
     * @param userEmail
     * @returns
     */
    getWorkoutHistory(userEmail) {
        return this.trainingBuddyService.getWorkoutHistory(userEmail);
    }
    addRating(userEmail, rating) {
        return this.trainingBuddyService.addRating(userEmail, rating);
    }
    /**
     *
     * @param userEmail
     * @returns
     * tested
     */
    getLogs(userEmail) {
        return this.trainingBuddyService.getLogs(userEmail);
    }
    /**
     *
     * @param userEmail
     * @param accessToken
     * @param refreshToken
     * @returns
     */
    saveTokens(userEmail, accessToken, refreshToken, exp, clientId, clientSecret, id) {
        return this.trainingBuddyService.saveTokens(userEmail, accessToken, refreshToken, exp, clientId, clientSecret, id);
    }
    /**
     *
     * @param userEmail
     * @returns
     */
    getTokens(userEmail) {
        return this.trainingBuddyService.getToken(userEmail);
    }
    /**
     *
     * @param userEmail
     * @param receiver
     * @param startTime
     * @returns ErrorMessage
     */
    sendInvite(userEmail, receiver, workoutID) {
        const val = this.trainingBuddyService.sendInvite(userEmail, receiver, workoutID);
        this.subscriptionInvites(userEmail, receiver, workoutID);
        return val;
    }
    /**
     * @return UserEntity
     */
    getUser(userID) {
        return this.trainingBuddyService.getUser(userID);
    }
    /**
     *
     * @param userEmail
     * @param startTime
     * @returns ErrorMessage
     */
    createInvite(userEmail, workoutID) {
        return this.trainingBuddyService.createInvite(userEmail, workoutID);
    }
    /**
     *
     * @param userEmail
     * @param sender
     * @param startTime
     * @returns ErrorMessage
     */
    acceptInvite(userEmail, sender, workoutID) {
        const val = this.trainingBuddyService.acceptInvite(userEmail, sender, workoutID);
        this.subscriptionInvites(userEmail, sender, workoutID);
        return val;
    }
    /**
     *
     * @param userEmail
     * @param sender
     * @param startTime
     * @returns ErrorMessage
     */
    rejectInvite(userEmail, sender, workoutID) {
        const val = this.trainingBuddyService.rejectInvite(userEmail, sender, workoutID);
        this.subscriptionInvites(userEmail, sender, workoutID);
        return val;
    }
    /**
     *
     * @param userEmail
     * @returns [Invite]
     */
    getIncomingInvites(userEmail) {
        return this.trainingBuddyService.getIncomingInvites(userEmail);
    }
    /**
     *
     * @param userEmail
     * @returns [Invite]
     */
    getOutgoingInvites(userEmail) {
        return this.trainingBuddyService.getOutgoingInvites(userEmail);
    }
    /**
     *
     * @param userEmail
     * @param startTime
     * @returns ResponseWorkout
     */
    getWorkout(userEmail, workoutID) {
        return this.trainingBuddyService.getWorkout(userEmail, workoutID);
    }
    /**
    *
    * @param userEmail
    * @param otherEmail
    * @returns ErrorMessage
    * tested
    */
    subscriptionsRequest(userEmail, otherEmail) {
        const data1 = this.trainingBuddyService.getIncoming(otherEmail);
        const data2 = this.trainingBuddyService.getOutgoing(userEmail);
        const data3 = this.trainingBuddyService.getConnections(userEmail);
        const data4 = this.trainingBuddyService.getConnections(otherEmail);
        pubsub.publish("getIncomingSub", { ["getIncomingSub"]: data1 });
        pubsub.publish("getOutgoingSub", { ["getOutgoingSub"]: data2 });
        pubsub.publish("getConnectionsSub", { ["getConnectionsSub"]: data3 });
        pubsub.publish("getConnectionsSub", { ["getConnectionsSub"]: data4 });
    }
    /**
     *
     * @param userEmail
     * @param otherEmail
     * @param startTime
     */
    subscriptionInvites(userEmail, otherEmail, startTime) {
        const data1 = this.trainingBuddyService.getIncomingInvites(otherEmail);
        const data2 = this.trainingBuddyService.getOutgoingInvites(userEmail);
        const data3 = this.trainingBuddyService.getWorkout(userEmail, startTime);
        pubsub.publish("getIncomingInviteSub", { ["getIncomingInviteSub"]: data1 });
        pubsub.publish("getOutgoingInviteSub", { ["getOutgoingInviteSub"]: data2 });
        pubsub.publish("getWorkoutSub", { ["getWorkoutSub"]: data3 });
    }
    getIncomingInviteSub() {
        const val = pubsub.asyncIterator("getIncomingInviteSub");
        return val;
    }
    getOutgoingInviteSub() {
        const val = pubsub.asyncIterator("getOutgoingInviteSub");
        return val;
    }
    getWorkoutSub() {
        const val = pubsub.asyncIterator("getWorkoutSub");
        return val;
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => data_access_1.ErrorMessage),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('userDto')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof data_access_1.UserDto !== "undefined" && data_access_1.UserDto) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "signup", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => data_access_1.LoginResponse),
    (0, common_1.UseGuards)(training_buddy_service_1.LoginGuard),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('loginInput')),
    (0, tslib_1.__param)(1, (0, graphql_1.Context)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof data_access_1.LoginInput !== "undefined" && data_access_1.LoginInput) === "function" ? _b : Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "login", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => [data_access_1.UserEntity]),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('email')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "findAll", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => data_access_1.UserEntity),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("email")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "getOne", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => data_access_1.ErrorMessage),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('updates')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_c = typeof data_access_1.UpdateUser !== "undefined" && data_access_1.UpdateUser) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "updateProfile", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => data_access_1.ErrorMessage),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('userConfig')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_d = typeof data_access_1.Userconfig !== "undefined" && data_access_1.Userconfig) === "function" ? _d : Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "userConfig", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => data_access_1.ErrorMessage),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('Activitylog')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_e = typeof data_access_1.ActivityLog !== "undefined" && data_access_1.ActivityLog) === "function" ? _e : Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "activityLog", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => data_access_1.ErrorMessage),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('ActivitySchedule')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_f = typeof data_access_1.ActivitySchedule !== "undefined" && data_access_1.ActivitySchedule) === "function" ? _f : Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "activitySchedule", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Subscription)(() => [data_access_1.ResponseWorkout]),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "getAllWorkouts", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => data_access_1.ErrorMessage),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('Sender')),
    (0, tslib_1.__param)(1, (0, graphql_1.Args)('Receiver')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "sendRequest", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Subscription)(() => [data_access_1.UserEntity]),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "getIncomingSub", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Subscription)(() => [data_access_1.UserEntity]),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "getOutgoingSub", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Subscription)(() => [data_access_1.UserEntity]),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "getConnectionsSub", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => data_access_1.ErrorMessage),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('Sender')),
    (0, tslib_1.__param)(1, (0, graphql_1.Args)('Receiver')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "reject", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => data_access_1.ErrorMessage),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('Sender')),
    (0, tslib_1.__param)(1, (0, graphql_1.Args)('Receiver')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "accept", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => [data_access_1.UserEntity]),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("email")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "getIncoming", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => [data_access_1.UserEntity]),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("email")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "getOutgoing", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => [data_access_1.UserEntity]),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("email")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "getConnections", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => [data_access_1.ResponseWorkout]),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("email")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "getScheduleWorkout", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => data_access_1.ErrorMessage),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("workoutID")),
    (0, tslib_1.__param)(1, (0, graphql_1.Args)("email")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "completeWorkout", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => [data_access_1.ResponseWorkout]),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("email")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "getWorkoutHistory", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => data_access_1.ErrorMessage),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("email")),
    (0, tslib_1.__param)(1, (0, graphql_1.Args)("rating")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, Number]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "addRating", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => [data_access_1.ResponseLogs]),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("email")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "getLogs", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => data_access_1.ErrorMessage),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("email")),
    (0, tslib_1.__param)(1, (0, graphql_1.Args)("access")),
    (0, tslib_1.__param)(2, (0, graphql_1.Args)("refresh")),
    (0, tslib_1.__param)(3, (0, graphql_1.Args)("exp")),
    (0, tslib_1.__param)(4, (0, graphql_1.Args)("clientId")),
    (0, tslib_1.__param)(5, (0, graphql_1.Args)("clientSecret")),
    (0, tslib_1.__param)(6, (0, graphql_1.Args)("id")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String, String, Number, String, String, String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "saveTokens", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => data_access_1.Tokens),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("email")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "getTokens", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => data_access_1.ErrorMessage),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("email")),
    (0, tslib_1.__param)(1, (0, graphql_1.Args)("receiver")),
    (0, tslib_1.__param)(2, (0, graphql_1.Args)("workoutID")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String, String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "sendInvite", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => data_access_1.UserEntity),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("UserID")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "getUser", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => data_access_1.ErrorMessage),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("email")),
    (0, tslib_1.__param)(1, (0, graphql_1.Args)("workoutID")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "createInvite", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => data_access_1.ErrorMessage),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("email")),
    (0, tslib_1.__param)(1, (0, graphql_1.Args)("sender")),
    (0, tslib_1.__param)(2, (0, graphql_1.Args)("workoutID")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String, String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "acceptInvite", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => data_access_1.ErrorMessage),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("email")),
    (0, tslib_1.__param)(1, (0, graphql_1.Args)("sender")),
    (0, tslib_1.__param)(2, (0, graphql_1.Args)("workoutID")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String, String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "rejectInvite", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => [data_access_1.Invite]),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("email")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "getIncomingInvites", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => [data_access_1.Invite]),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("email")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "getOutgoingInvites", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => data_access_1.ResponseWorkout),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("email")),
    (0, tslib_1.__param)(1, (0, graphql_1.Args)("workoutID")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "getWorkout", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Subscription)(() => [data_access_1.Invite]),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "getIncomingInviteSub", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Subscription)(() => [data_access_1.Invite]),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "getOutgoingInviteSub", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Subscription)(() => [data_access_1.ResponseWorkout]),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], TrainingBuddyApiResolver.prototype, "getWorkoutSub", null);
TrainingBuddyApiResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_g = typeof training_buddy_service_1.TrainingBuddyServiceService !== "undefined" && training_buddy_service_1.TrainingBuddyServiceService) === "function" ? _g : Object])
], TrainingBuddyApiResolver);
exports.TrainingBuddyApiResolver = TrainingBuddyApiResolver;


/***/ }),

/***/ "./libs/api/internal-api/repository/data-access/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.usersWatch = exports.buddyConnectionsWatch = exports.buddyRequestsWatch = exports.workoutInvitesWatch = exports.activityLogsWatch = exports.scheduledWorkoutsWatch = void 0;
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/repository/data-access/src/lib/api-internal-api-repository-data-access.service.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/repository/data-access/src/lib/api-internal-api-repository-data-access.module.ts"), exports);
const rxjs_1 = __webpack_require__("rxjs");
const api_internal_api_repository_data_access_service_1 = __webpack_require__("./libs/api/internal-api/repository/data-access/src/lib/api-internal-api-repository-data-access.service.ts");
const repo = new api_internal_api_repository_data_access_service_1.ApiInternalApiRepositoryDataAccessService();
exports.scheduledWorkoutsWatch = new rxjs_1.Observable((subscriber) => {
    repo.scheduledWorkoutCollection.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            subscriber.next(doc.data());
        });
    });
});
exports.activityLogsWatch = new rxjs_1.Observable((subscriber) => {
    repo.activityLogsCollection.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            subscriber.next(doc.data());
        });
    });
});
exports.workoutInvitesWatch = new rxjs_1.Observable((subscriber) => {
    repo.workoutInvitesCollection.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            subscriber.next(doc.data());
        });
    });
});
exports.buddyRequestsWatch = new rxjs_1.Observable((subscriber) => {
    repo.buddyRequestsCollection.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            subscriber.next(doc.data());
        });
    });
});
exports.buddyConnectionsWatch = new rxjs_1.Observable((subscriber) => {
    repo.buddyConnectionsCollection.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            subscriber.next(doc.data());
        });
    });
});
exports.usersWatch = new rxjs_1.Observable((subscriber) => {
    repo.usersCollection.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            subscriber.next(doc.data());
        });
    });
});


/***/ }),

/***/ "./libs/api/internal-api/repository/data-access/src/lib/api-internal-api-repository-data-access.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiInternalApiRepositoryDataAccessModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const api_internal_api_repository_data_access_service_1 = __webpack_require__("./libs/api/internal-api/repository/data-access/src/lib/api-internal-api-repository-data-access.service.ts");
let ApiInternalApiRepositoryDataAccessModule = class ApiInternalApiRepositoryDataAccessModule {
};
ApiInternalApiRepositoryDataAccessModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        controllers: [],
        providers: [api_internal_api_repository_data_access_service_1.ApiInternalApiRepositoryDataAccessService],
        exports: [api_internal_api_repository_data_access_service_1.ApiInternalApiRepositoryDataAccessService],
    })
], ApiInternalApiRepositoryDataAccessModule);
exports.ApiInternalApiRepositoryDataAccessModule = ApiInternalApiRepositoryDataAccessModule;


/***/ }),

/***/ "./libs/api/internal-api/repository/data-access/src/lib/api-internal-api-repository-data-access.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiInternalApiRepositoryDataAccessService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const data_access_1 = __webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/index.ts");
const admin = __webpack_require__("firebase-admin");
const firebase_admin_1 = __webpack_require__("firebase-admin");
const uuid = __webpack_require__("uuid");
const axios_1 = __webpack_require__("axios");
let ApiInternalApiRepositoryDataAccessService = class ApiInternalApiRepositoryDataAccessService {
    constructor() {
        //readonly arrayUnion = FirebaseFirestore.FieldValue.arrayUnion ;
        this.firestore = new admin.firestore.Firestore();
        this.arrayUnion = firebase_admin_1.firestore.FieldValue.arrayUnion;
        this.arrayRemove = firebase_admin_1.firestore.FieldValue.arrayRemove;
        this.usersCollection = this.firestore.collection('/Users');
        this.activityLogsCollection = this.firestore.collection('/ActivityLogs');
        this.buddyConnectionsCollection = this.firestore.collection('/BuddyConnections');
        this.buddyRequestsCollection = this.firestore.collection('/BuddyRequests');
        this.scheduledWorkoutCollection = this.firestore.collection('/ScheduledWorkouts');
        this.workoutInvitesCollection = this.firestore.collection('/WorkoutInvites');
    }
    getActivityScheduleCollection() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.scheduledWorkoutCollection;
        });
    }
    //USERS
    //users - CREATE
    createUser(user) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const data = {
                id: uuid.v1().toString(),
                userName: user.userName,
                userSurname: user.userSurname,
                email: user.email,
                cellNumber: user.cellNumber,
                dob: user.dob,
                gender: user.gender,
                longitude: user.longitude,
                latitude: user.latitude,
                location: user.location,
                password: user.password,
                buddies: [],
                signUpStage: 0,
                ratings: []
            };
            yield this.usersCollection.doc().set(data)
                .then(results => {
                return data;
            });
            return data;
        });
    }
    //users - READ
    login(email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.usersCollection.where('email', '==', email).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0]) {
                    let total = 0;
                    const person = result.docs[0].data();
                    if (person.ratings.length > 0) {
                        person.ratings.forEach(element => {
                            total += element;
                        });
                        person.rating = Math.round(total / person.ratings.length);
                    }
                    else {
                        person.rating = 0;
                    }
                    return person;
                }
                ;
                return false;
            }));
        });
    }
    getUser(userID) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.usersCollection.where('id', '==', userID).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return result.docs[0].data();
                return false;
            }));
        });
    }
    getMetrics(email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const data = [];
            yield this.usersCollection.where('email', '!=', email).get().then((querySnapshot) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                querySnapshot.docs.forEach((doc) => {
                    const metric = [];
                    metric.push(doc.data().email);
                    metric.push(doc.data().metrics);
                    data.push(metric);
                });
            }));
            return data;
        });
    }
    findAll(email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const users = [];
            yield this.usersCollection.get().then((querySnapshot) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                querySnapshot.docs.forEach((doc) => {
                    if (doc.data().signUpStage > 0)
                        users.push(doc.data());
                });
            }));
            return users;
        });
    }
    //user - SAVE STRAVA TOKENS
    findByStravaId(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.usersCollection.where('strava.ownerId', '==', id).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return result.docs[0].data();
                return false;
            }));
        });
    }
    saveTokens(email, access, refresh, exp, clientId, clientSecret, id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const data = {
                strava: {
                    stravaAccess: access,
                    stravaRefresh: refresh,
                    exp: exp,
                    clientId: clientId,
                    clientSecret: clientSecret,
                    ownerId: id
                },
                signUpStage: 3
            };
            const toLog = [];
            //fetch strava activities
            yield this.getActivities(access).then((activities) => {
                //console.log(activities.data) ;
                activities.data.forEach(activity => {
                    let valid = false;
                    let type = "";
                    if (activity.type == "Run") {
                        valid = true;
                        type = "run";
                    }
                    else if (activity.type == "Ride") {
                        valid = true;
                        type = "ride";
                    }
                    else if (activity.type == "Swim") {
                        valid = true;
                        type = "swim";
                    }
                    else if (activity.type == "Workout") {
                        valid = true;
                        type = "lift";
                    }
                    //const exists = this.activityExists(activity.id) ;
                    // if(this.activityExists(activity.id)){
                    //     console.log("exists") ;
                    //     valid = false ;
                    // }
                    if (valid) {
                        const date = Math.floor(new Date(activity.start_date).getTime() / 1000);
                        //console.log(activity) ;
                        const log = {
                            id: activity.id,
                            user: email,
                            activityType: type,
                            dateComplete: date,
                            distance: activity.distance,
                            name: activity.name,
                            speed: activity.average_speed,
                            time: activity.moving_time
                        };
                        //console.log(log) ;
                        toLog.push(log);
                    }
                });
            });
            yield this.logManyActivities(toLog);
            return this.usersCollection.where('email', '==', email).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.usersCollection.doc(result.docs[0].id).set(data, { merge: true }).then(results => {
                        return true;
                    });
                return false;
            }));
        });
    }
    getTokens(email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const data = [];
            return this.usersCollection.where('email', '==', email).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                data.push(result.docs[0].data().stravaAccess);
                data.push(result.docs[0].data().stravaRefresh);
                return data;
            }));
        });
    }
    //user - UPDATE
    userConfig(userConfig) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let run = 0;
            let runGroup = -1;
            let ride = 0;
            let rideGroup = -1;
            let swim = 0;
            let swimGroup = -1;
            let lift = 0;
            let liftGroup = -1;
            if (userConfig.riding) {
                ride = userConfig.riding;
                rideGroup = 0;
            }
            if (userConfig.running) {
                run = userConfig.running;
                runGroup = 0;
            }
            if (userConfig.swimming) {
                swim = userConfig.swimming;
                swimGroup = 0;
            }
            if (userConfig.weightLifting) {
                lift = userConfig.weightLifting;
                liftGroup = 0;
            }
            const data = {
                metrics: {
                    run: run,
                    ride: ride,
                    swim: swim,
                    lift: lift
                },
                groups: {
                    runGroup: runGroup,
                    rideGroup: rideGroup,
                    swimGroup: swimGroup,
                    liftGroup: liftGroup
                },
                distance: userConfig.distance,
                bio: userConfig.bio,
                signUpStage: 1
            };
            return this.usersCollection.where('email', '==', userConfig.email).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.usersCollection.doc(result.docs[0].id).set(data, { merge: true }).then(results => {
                        return true;
                    });
                return false;
            }));
        });
    }
    addRating(email, rating) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.usersCollection.where('email', '==', email).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.usersCollection.doc(result.docs[0].id).update({ ratings: this.arrayUnion(rating) }).then(results => {
                        return true;
                    });
                return false;
            }));
        });
    }
    updateCellNumber(cellNumber, email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.usersCollection.where('email', '==', email).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.usersCollection.doc(result.docs[0].id).update({ cellNumber: cellNumber }).then(results => {
                        return true;
                    });
                return false;
            }));
        });
    }
    updateDistance(distance, email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.usersCollection.where('email', '==', email).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.usersCollection.doc(result.docs[0].id).update({ distance: distance }).then(results => {
                        return true;
                    });
                return false;
            }));
        });
    }
    updateEmail(email, oldEmail) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.usersCollection.where('email', '==', oldEmail).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.usersCollection.doc(result.docs[0].id).update({ email: email }).then(results => {
                        return true;
                    });
                return false;
            }));
        });
    }
    updateLocation(location, email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.usersCollection.where('email', '==', email).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.usersCollection.doc(result.docs[0].id).update({ location: location }).then(results => {
                        return true;
                    });
                return false;
            }));
        });
    }
    updatePassword(password, email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.usersCollection.where('email', '==', email).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.usersCollection.doc(result.docs[0].id).update({ password: password }).then(results => {
                        return true;
                    });
                return false;
            }));
        });
    }
    updateUserName(userName, email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.usersCollection.where('email', '==', email).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.usersCollection.doc(result.docs[0].id).update({ userName: userName }).then(results => {
                        return true;
                    });
                return false;
            }));
        });
    }
    updateUserSurname(userSurname, email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.usersCollection.where('email', '==', email).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.usersCollection.doc(result.docs[0].id).update({ userSurname: userSurname }).then(results => {
                        return true;
                    });
                return false;
            }));
        });
    }
    updateLongitude(long, email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.usersCollection.where('email', '==', email).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.usersCollection.doc(result.docs[0].id).update({ longitude: long }).then(results => {
                        return true;
                    });
                return false;
            }));
        });
    }
    updateLatitude(latitude, email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.usersCollection.where('email', '==', email).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.usersCollection.doc(result.docs[0].id).update({ latitude: latitude }).then(results => {
                        return true;
                    });
                return false;
            }));
        });
    }
    updateRunning(run, email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let r = 0;
            if (run)
                r = 1;
            return this.usersCollection.where('email', '==', email).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.usersCollection.doc(result.docs[0].id).update({ "metrics.run": r }).then(results => {
                        return true;
                    });
                return false;
            }));
        });
    }
    updateRiding(ride, email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let r = 0;
            if (ride)
                r = 1;
            return this.usersCollection.where('email', '==', email).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.usersCollection.doc(result.docs[0].id).update({ "metrics.ride": r }).then(results => {
                        return true;
                    });
                return false;
            }));
        });
    }
    updateSwimming(swim, email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let r = 0;
            if (swim)
                r = 1;
            return this.usersCollection.where('email', '==', email).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.usersCollection.doc(result.docs[0].id).update({ "metrics.swim": r }).then(results => {
                        return true;
                    });
                return false;
            }));
        });
    }
    updateLifting(lift, email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let r = 0;
            if (lift)
                r = 1;
            return this.usersCollection.where('email', '==', email).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.usersCollection.doc(result.docs[0].id).update({ "metrics.lift": r }).then(results => {
                        return true;
                    });
                return false;
            }));
        });
    }
    updateBio(bio, email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.usersCollection.where('email', '==', email).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.usersCollection.doc(result.docs[0].id).update({ bio: bio }).then(results => {
                        return true;
                    });
                return false;
            }));
        });
    }
    updateAccessToken(token, email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.usersCollection.where('email', '==', email).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.usersCollection.doc(result.docs[0].id).update({ "strava.stravaAccess": token }).then(results => {
                        return true;
                    });
                return false;
            }));
        });
    }
    //user - DELETE
    //TODO: implement
    //ACTIVITY LOGS
    //activity logs - CREATE
    logStrava(activityId, ownerId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log("repo reached");
            const user = yield this.findByStravaId(ownerId);
            if (user) {
                //check if token is expired
                console.log("exists");
                if ((user.strava.exp < Date.now() / 1000)) {
                    //get new token
                    yield this.getNewToken(user.strava.stravaRefresh, user.strava.clientId, user.strava.clientSecret).then((access) => {
                        console.log(access.data.access_token);
                        this.updateAccessToken(access.data.access_token, user.email).then((newAccess) => {
                            axios_1.default.get('https://www.strava.com/api/v3/activities/' + activityId + '?access_token=' + newAccess).then((res) => {
                                console.log("new access token", res);
                                let valid = false;
                                let type = "";
                                if (res.data.type == "Run") {
                                    valid = true;
                                    type = "run";
                                }
                                else if (res.data.type == "Ride") {
                                    valid = true;
                                    type = "ride";
                                }
                                else if (res.data.type == "Swim") {
                                    valid = true;
                                    type = "swim";
                                }
                                else if (res.data.type == "Workout") {
                                    valid = true;
                                    type = "lift";
                                }
                                if (valid) {
                                    const date = new Date(res.data.start_date);
                                    const log = {
                                        id: res.data.id,
                                        user: user.email,
                                        activityType: type,
                                        dateComplete: date,
                                        distance: res.data.distance,
                                        name: res.data.name,
                                        speed: res.data.average_speed,
                                        time: res.data.moving_time
                                    };
                                    //console.log(log) ;
                                    this.activityLogsCollection.doc().set(log);
                                }
                            });
                        });
                    });
                }
                else {
                    const origAccess = user.strava.stravaAccess;
                    axios_1.default.get('https://www.strava.com/api/v3/activities/' + activityId + '?access_token=' + origAccess).then((res) => {
                        console.log("old access token", res);
                        let valid = false;
                        let type = "";
                        if (res.data.type == "Run") {
                            valid = true;
                            type = "run";
                        }
                        else if (res.data.type == "Ride") {
                            valid = true;
                            type = "ride";
                        }
                        else if (res.data.type == "Swim") {
                            valid = true;
                            type = "swim";
                        }
                        else if (res.data.type == "Workout") {
                            valid = true;
                            type = "lift";
                        }
                        if (valid) {
                            const date = new Date(res.data.start_date);
                            const log = {
                                id: res.data.id,
                                user: user.email,
                                activityType: type,
                                dateComplete: date,
                                distance: res.data.distance,
                                name: res.data.name,
                                speed: res.data.average_speed,
                                time: res.data.moving_time
                            };
                            //console.log(log) ;
                            this.activityLogsCollection.doc().set(log);
                        }
                    });
                }
            }
        });
    }
    logActivity(log) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const data = {
                user: log.email,
                activityType: log.activityType,
                dateComplete: log.dateCompleted,
                distance: log.distance,
                name: log.name,
                speed: log.speed,
                time: log.time
            };
            yield this.activityLogsCollection.doc().set(data)
                .then(results => {
                return true;
            });
            return false;
        });
    }
    logManyActivities(logs) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const batch = (0, firebase_admin_1.firestore)().batch();
            logs.forEach(log => {
                const docRef = this.activityLogsCollection.doc();
                batch.set(docRef, log);
            });
            yield batch.commit();
            return true;
        });
    }
    activityExists(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.activityLogsCollection.where('id', '==', id).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0]) {
                    //console.log(result.docs[0]);
                    return true;
                }
                return false;
            }));
        });
    }
    //activity logs - READ
    getActivities(accessToken) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                axios_1.default.get('https://www.strava.com/api/v3/athlete/activities?per_page=20&access_token=' + accessToken).then((res) => {
                    resolve(res);
                });
            });
        });
    }
    getNewToken(refreshToken, clientId, clientSecret) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const payload = { 'client_id': clientId, 'client_secret': clientSecret, 'grant_type': 'refresh_token', 'refresh_token': refreshToken };
                axios_1.default.post('https://www.strava.com/api/v3/oauth/token', payload).then((res) => {
                    resolve(res);
                });
            });
        });
    }
    getLogs(email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const logs = [];
            yield this.activityLogsCollection.where('user', '==', email).get().then((querySnapshot) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                querySnapshot.docs.forEach((doc) => {
                    logs.push(doc.data());
                });
            }));
            return logs;
        });
    }
    //activity logs - DELETE
    //TODO: implement
    //REQUESTS
    //requests - CREATE
    makeConnectionRequest(sender, receiver) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const now = new Date();
            const data = {
                sender: sender,
                receiver: receiver,
                time: now
            };
            yield this.buddyRequestsCollection.doc().set(data)
                .then(results => {
                return true;
            });
            return false;
        });
    }
    //requests - READ
    //incoming
    getIncomingRequests(email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const requests = [];
            yield this.buddyRequestsCollection.where('receiver', '==', email).get().then((querySnapshot) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                querySnapshot.docs.forEach((doc) => {
                    requests.push(doc.data());
                });
            }));
            return requests;
            //return this.fs.collection('BuddyRequests', ref => ref.where('receiver', '==', email)).valueChanges();
        });
    }
    //outgoing
    getOutgoingRequests(email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const requests = [];
            yield this.buddyRequestsCollection.where('sender', '==', email).get().then((querySnapshot) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                querySnapshot.docs.forEach((doc) => {
                    requests.push(doc.data());
                });
            }));
            return requests;
        });
    }
    //requests - DELETE
    deleteConnectionRequest(receiver, sender) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.buddyRequestsCollection.where('sender', '==', sender).where('receiver', '==', receiver).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.buddyRequestsCollection.doc(result.docs[0].id).delete().then(results => {
                        console.log("deleted");
                        return true;
                    });
                console.log("delete problem");
                return false;
            }));
        });
    }
    //CONNECTIONS
    //connections - CREATE
    makeConnection(user1, user2) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.usersCollection.where('email', '==', user1).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.usersCollection.doc(result.docs[0].id).update({ buddies: this.arrayUnion(user2) }).then(results => {
                        return this.usersCollection.where('email', '==', user2).get().then((result1) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                            if (result1.docs[0])
                                return this.usersCollection.doc(result1.docs[0].id).update({ buddies: this.arrayUnion(user1) }).then(results => {
                                    return true;
                                });
                        }));
                    });
                return false;
            }));
        });
    }
    //connections - READ
    getConnections(email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const buddies = [];
            yield this.buddyConnectionsCollection.where('users', 'array-contains', email).get().then((querySnapshot) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                querySnapshot.docs.forEach((doc) => {
                    buddies.push(doc.data());
                });
            }));
            return buddies;
        });
    }
    //connections - UPDATE (metric)
    //TODO: implement
    //connections - DELETE
    deleteConnection(user1, user2) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.buddyConnectionsCollection.where('user1', '==', user1).where('user2', '==', user2).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0])
                    return this.buddyConnectionsCollection.doc(result.docs[0].id).delete().then(results => {
                        return true;
                    });
                return false;
            }));
        });
    }
    //SCHEDULED WORKOUTS
    //scheduled workouts - CREATE
    scheduleWorkout(workout) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const data = {
                id: uuid.v1().toString(),
                title: workout.title,
                organiser: workout.email,
                participants: [{ email: workout.email, complete: false }],
                startTime: workout.time,
                activityType: workout.activity,
                startPoint: workout.location,
                proposedDistance: workout.distance,
                proposedDuration: workout.duration,
            };
            yield this.scheduledWorkoutCollection.doc().set(data)
                .then(results => {
                return true;
            });
            return false;
        });
    }
    getScheduledWorkouts(email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const workouts = [];
            yield this.scheduledWorkoutCollection.where('participants', 'array-contains', { 'email': email, 'complete': false }).get().then((querySnapshot) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                querySnapshot.docs.forEach((doc) => {
                    if (doc.data().startTime >= Date.now() / 1000)
                        workouts.push(doc.data());
                });
            }));
            return workouts;
        });
    }
    getWorkoutHistory(email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const workouts = [];
            yield this.scheduledWorkoutCollection.where('participants', 'array-contains', { 'email': email, 'complete': false }).get().then((querySnapshot) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                querySnapshot.docs.forEach((doc) => {
                    if (doc.data().startTime < Date.now() / 1000) {
                        const w = doc.data();
                        const c = [];
                        c.push(false);
                        w.complete = c;
                        workouts.push(w);
                    }
                });
            }));
            yield this.scheduledWorkoutCollection.where('participants', 'array-contains', { 'email': email, 'complete': true }).get().then((querySnapshot) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                querySnapshot.docs.forEach((doc) => {
                    if (doc.data().startTime < Date.now() / 1000) {
                        const w1 = doc.data();
                        const c1 = [];
                        c1.push(true);
                        w1.complete = c1;
                        workouts.push(w1);
                    }
                });
            }));
            return workouts;
        });
    }
    getWorkout(email, workoutID) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.scheduledWorkoutCollection.where('id', '==', workoutID).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0]) {
                    const data = result.docs[0].data();
                    const users = [];
                    const completeVals = [];
                    data.participants.forEach((user) => {
                        users.push(this.login(user.email));
                        completeVals.push(user.complete);
                    });
                    data.participants = users;
                    data.complete = completeVals;
                    return data;
                    //return result.docs[0].data() ;
                }
                return false;
            }));
        });
    }
    //scheduled workouts - UPDATE
    //TODO: implement
    //workout invite - CREATE
    createInvite(email, workout) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const data = {
                sender: email,
                receivers: [],
                workout: workout
            };
            yield this.workoutInvitesCollection.doc().set(data).then(results => {
                return true;
            });
            return false;
        });
    }
    //workout invite - SEND
    sendInvite(sender, receivers, workout) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.workoutInvitesCollection.where('sender', '==', sender).where('workout', '==', workout).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0]) {
                    console.log("hello");
                    for (let i = 0; i < receivers.length; i++) {
                        this.workoutInvitesCollection.doc(result.docs[0].id).update({ receivers: this.arrayUnion(receivers[i]) });
                    }
                    return true;
                }
                return false;
            }));
        });
    }
    //workout invite - ACCEPT
    acceptInvite(user, sender, workout) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.workoutInvitesCollection.where('sender', '==', sender).where('workout', '==', workout).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                if (result.docs[0]) {
                    return this.workoutInvitesCollection.doc(result.docs[0].id).update({ receivers: this.arrayRemove(user) }).then(results => {
                        return this.scheduledWorkoutCollection.where("id", "==", workout).get().then((res) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                            return this.scheduledWorkoutCollection.doc(res.docs[0].id).update({ participants: this.arrayUnion({ 'email': user, 'complete': false }) }).then(result => {
                                return true;
                            });
                        }));
                    });
                }
                ;
            }));
            return false;
        });
    }
    //workout invite - REJECT
    rejectInvite(user, sender, workoutID) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (workoutID != null) {
                return this.workoutInvitesCollection.where('sender', '==', sender).where('workout', '==', workoutID).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                    if (result.docs[0])
                        return this.workoutInvitesCollection.doc(result.docs[0].id).update({ receivers: this.arrayRemove(user) }).then(results => {
                            return true;
                        });
                    return false;
                }));
            }
        });
    }
    getIncomingInvites(user) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const invites = [];
            yield this.workoutInvitesCollection.where('receivers', 'array-contains', user).get().then((querySnapshot) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                querySnapshot.docs.forEach((doc) => {
                    // const recs = [] ;
                    // doc.data().receivers.forEach((rec) => {
                    //     recs.push(this.login(rec)) ;
                    // })
                    const data = {
                        sender: doc.data().sender,
                        receivers: doc.data().receivers,
                        workout: this.getWorkout(user, doc.data().workout)
                    };
                    invites.push(data);
                });
            }));
            return invites;
        });
    }
    getOutgoingInvites(user) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const invites = [];
            yield this.workoutInvitesCollection.where('sender', '==', user).get().then((querySnapshot) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                querySnapshot.docs.forEach((doc) => {
                    const data = {
                        sender: doc.data().sender,
                        receivers: doc.data().receivers,
                        workout: this.getWorkout(user, doc.data().workout)
                    };
                    invites.push(data);
                });
            }));
            return invites;
        });
    }
    //complete a workout
    completeWorkout(workoutID, email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            //change status to complete
            if (workoutID != null) {
                return this.scheduledWorkoutCollection.where("id", "==", workoutID).get().then((result) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                    return this.scheduledWorkoutCollection.doc(result.docs[0].id).update({ participants: this.arrayRemove({ 'email': email, 'complete': false }) }).then(results => {
                        return this.scheduledWorkoutCollection.doc(result.docs[0].id).update({ participants: this.arrayUnion({ 'email': email, 'complete': true }) });
                    });
                }));
            }
        });
    }
};
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof data_access_1.UserDto !== "undefined" && data_access_1.UserDto) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "createUser", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ApiInternalApiRepositoryDataAccessService.prototype, "login", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ApiInternalApiRepositoryDataAccessService.prototype, "getUser", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "getMetrics", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "findAll", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "findByStravaId", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__param)(2, (0, common_1.Param)()),
    (0, tslib_1.__param)(3, (0, common_1.Param)()),
    (0, tslib_1.__param)(4, (0, common_1.Param)()),
    (0, tslib_1.__param)(5, (0, common_1.Param)()),
    (0, tslib_1.__param)(6, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String, String, Number, Object, Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "saveTokens", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "getTokens", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_d = typeof data_access_1.Userconfig !== "undefined" && data_access_1.Userconfig) === "function" ? _d : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "userConfig", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "addRating", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "updateCellNumber", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "updateDistance", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "updateEmail", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "updateLocation", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "updatePassword", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "updateUserName", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "updateUserSurname", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "updateLongitude", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "updateLatitude", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Boolean, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "updateRunning", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Boolean, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "updateRiding", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Boolean, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "updateSwimming", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Boolean, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "updateLifting", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "updateBio", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "updateAccessToken", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "logStrava", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_e = typeof data_access_1.ActivityLog !== "undefined" && data_access_1.ActivityLog) === "function" ? _e : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "logActivity", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Array]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "logManyActivities", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "activityExists", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "getLogs", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "makeConnectionRequest", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "getIncomingRequests", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "getOutgoingRequests", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "deleteConnectionRequest", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "makeConnection", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "getConnections", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "deleteConnection", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_f = typeof data_access_1.ActivitySchedule !== "undefined" && data_access_1.ActivitySchedule) === "function" ? _f : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "scheduleWorkout", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "getScheduledWorkouts", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "getWorkoutHistory", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ApiInternalApiRepositoryDataAccessService.prototype, "getWorkout", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "createInvite", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__param)(2, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, Array, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "sendInvite", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__param)(2, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "acceptInvite", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__param)(2, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "rejectInvite", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "getIncomingInvites", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "getOutgoingInvites", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, common_1.Param)()),
    (0, tslib_1.__param)(1, (0, common_1.Param)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], ApiInternalApiRepositoryDataAccessService.prototype, "completeWorkout", null);
ApiInternalApiRepositoryDataAccessService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], ApiInternalApiRepositoryDataAccessService);
exports.ApiInternalApiRepositoryDataAccessService = ApiInternalApiRepositoryDataAccessService;


/***/ }),

/***/ "./libs/api/internal-api/service/training-buddy-service/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/service/training-buddy-service/src/lib/api-internal-api-service-training-buddy-service.module.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/service/training-buddy-service/src/lib/training-buddy-service.service.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/service/training-buddy-service/src/lib/local.strategy.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/service/training-buddy-service/src/lib/login.guard.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/service/training-buddy-service/src/lib/jwt-strategy.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/internal-api/service/training-buddy-service/src/lib/jwt-auth.guard.ts"), exports);


/***/ }),

/***/ "./libs/api/internal-api/service/training-buddy-service/src/lib/api-internal-api-service-training-buddy-service.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiInternalApiServiceTrainingBuddyServiceModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const training_buddy_service_service_1 = __webpack_require__("./libs/api/internal-api/service/training-buddy-service/src/lib/training-buddy-service.service.ts");
const local_strategy_1 = __webpack_require__("./libs/api/internal-api/service/training-buddy-service/src/lib/local.strategy.ts");
const passport_1 = __webpack_require__("@nestjs/passport");
const login_guard_1 = __webpack_require__("./libs/api/internal-api/service/training-buddy-service/src/lib/login.guard.ts");
const jwt_strategy_1 = __webpack_require__("./libs/api/internal-api/service/training-buddy-service/src/lib/jwt-strategy.ts");
const jwt_auth_guard_1 = __webpack_require__("./libs/api/internal-api/service/training-buddy-service/src/lib/jwt-auth.guard.ts");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const data_access_1 = __webpack_require__("./libs/api/internal-api/repository/data-access/src/index.ts");
const data_access_2 = __webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/index.ts");
let ApiInternalApiServiceTrainingBuddyServiceModule = class ApiInternalApiServiceTrainingBuddyServiceModule {
};
ApiInternalApiServiceTrainingBuddyServiceModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        controllers: [],
        imports: [passport_1.PassportModule, jwt_1.JwtModule.register({
                signOptions: { expiresIn: '86400s' },
                secret: "hide" //TODO hide this 
            }),],
        providers: [training_buddy_service_service_1.TrainingBuddyServiceService, local_strategy_1.LocalStrategy, login_guard_1.LoginGuard, jwt_strategy_1.JwtStrategy, jwt_auth_guard_1.JwtAuthGuard, data_access_1.ApiInternalApiRepositoryDataAccessService, data_access_2.UserEntity],
        exports: [training_buddy_service_service_1.TrainingBuddyServiceService, jwt_1.JwtModule.register({
                signOptions: { expiresIn: '86400s' },
                secret: "hide" //TODO hide this 
            }),],
    })
], ApiInternalApiServiceTrainingBuddyServiceModule);
exports.ApiInternalApiServiceTrainingBuddyServiceModule = ApiInternalApiServiceTrainingBuddyServiceModule;


/***/ }),

/***/ "./libs/api/internal-api/service/training-buddy-service/src/lib/jwt-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const passport_1 = __webpack_require__("@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    /**
     *
     * @param context
     * @returns request body
     */
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
};
JwtAuthGuard = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),

/***/ "./libs/api/internal-api/service/training-buddy-service/src/lib/jwt-strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const common_1 = __webpack_require__("@nestjs/common");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'hide', //TODO hide this in evn secrets
        });
    }
    /**
     *
     * @param payload
     * @returns
     */
    validate(payload) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return { email: payload.email, username: payload.username };
        });
    }
};
JwtStrategy = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./libs/api/internal-api/service/training-buddy-service/src/lib/local.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_local_1 = __webpack_require__("passport-local");
const passport_1 = __webpack_require__("@nestjs/passport");
const training_buddy_service_service_1 = __webpack_require__("./libs/api/internal-api/service/training-buddy-service/src/lib/training-buddy-service.service.ts");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    /**
     *
     * @param trainingBuddyServiceService
     */
    constructor(trainingBuddyServiceService) {
        super();
        this.trainingBuddyServiceService = trainingBuddyServiceService;
    }
    /**
     *
     * @param email
     * @param password
     * @returns  UnauthorizedException || UserEntity
     */
    validate(email, password) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.trainingBuddyServiceService.validateUser(email, password);
            if (!user) {
                return "User has no Account";
            }
            return user;
        });
    }
};
LocalStrategy = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof training_buddy_service_service_1.TrainingBuddyServiceService !== "undefined" && training_buddy_service_service_1.TrainingBuddyServiceService) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),

/***/ "./libs/api/internal-api/service/training-buddy-service/src/lib/login.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const passport_1 = __webpack_require__("@nestjs/passport");
let LoginGuard = class LoginGuard extends (0, passport_1.AuthGuard)('local') {
    constructor() {
        super();
    }
    /**
     *
     * @param context
     * @returns RequestBody
     */
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const request = ctx.getContext();
        request.body = ctx.getArgs().loginInput;
        return request;
    }
};
LoginGuard = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [])
], LoginGuard);
exports.LoginGuard = LoginGuard;


/***/ }),

/***/ "./libs/api/internal-api/service/training-buddy-service/src/lib/training-buddy-service.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TrainingBuddyServiceService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const data_access_1 = __webpack_require__("./libs/api/internal-api/api/shared/interfaces/data-access/src/index.ts");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const bcrypt = __webpack_require__("bcrypt");
const js_sha256_1 = __webpack_require__("js-sha256");
const data_access_2 = __webpack_require__("./libs/api/internal-api/repository/data-access/src/index.ts");
let recommended = [];
let TrainingBuddyServiceService = class TrainingBuddyServiceService {
    /**
     *
     * @param jwtService
     */
    constructor(jwtService, repoService, user) {
        this.jwtService = jwtService;
        this.repoService = repoService;
        this.user = user;
    }
    sendEmail(email, user) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const SibApiV3Sdk = yield Promise.resolve().then(() => __webpack_require__("sib-api-v3-sdk"));
            const defaultClient = SibApiV3Sdk.ApiClient.instance;
            const apiKey = defaultClient.authentications['api-key'];
            apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
            const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
            let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
            const rec = yield this.findOne(email);
            sendSmtpEmail = {
                to: [{
                        email: email,
                        name: rec.userName
                    }],
                templateId: 1,
                params: {
                    name: 'John',
                    surname: 'Doe'
                },
                headers: {
                    'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
                }
            };
            apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
                console.log(data);
                return data;
            }, function (error) {
                console.log(error);
                console.error(error);
            });
        });
    }
    /**
     *
     * @param email
     * @param password
     * @returns null || UserEntity
     */
    validateUser(email, password) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.findOne(email);
            let valid = false;
            if (user) {
                const encrypted = (0, js_sha256_1.sha256)(password);
                valid = yield bcrypt.compare(encrypted, user === null || user === void 0 ? void 0 : user.password);
            }
            if (user && valid) {
                const { password } = user, result = (0, tslib_1.__rest)(user, ["password"]);
                return result;
            }
            return null;
        });
    }
    /**
     *
     * @param email
     * @returns Promise UserEntity
     */
    findOne(email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let total = 0;
            const person = yield this.repoService.login(email);
            if (person) {
                if (person.ratings.length > 0) {
                    person.ratings.forEach(element => {
                        total += element;
                    });
                    person.rating = Math.round(total / person.ratings.length);
                }
                else {
                    person.rating = 0;
                }
            }
            return person;
        });
    }
    /**
     *
     * @param userdto
     * @returns ErrorMessage
     */
    signup(userdto) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let user = yield this.findOne(userdto.email);
            if (yield user) {
                const item = new data_access_1.ErrorMessage;
                item.message = "User Already Exists failure";
                return item;
            }
            else {
                const encrypted = (0, js_sha256_1.sha256)(userdto.password);
                const password = yield bcrypt.hash(encrypted, 10);
                user = Object.assign(Object.assign({}, userdto), { password });
                const ret = yield this.repoService.createUser(user);
                const item = new data_access_1.ErrorMessage;
                item.message = ret.id;
                return item;
            }
        });
    }
    /**
     * @param string
     * @returns Array Of UserEntity
     */
    getAll(email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const arr = yield this.repoService.findAll(email);
            let distance = 0;
            let longitude = 0;
            let latitude = 0;
            const people = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].email === email) {
                    distance = arr[i].distance;
                    longitude = arr[i].longitude;
                    latitude = arr[i].latitude;
                }
            }
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].email != email && arr[i].metrics != null) {
                    if ((yield this.calculatedistance(arr[i].latitude, arr[i].longitude, latitude, longitude)) <= distance) {
                        people.push(arr[i]);
                    }
                }
            }
            people.push(yield this.findOne(email));
            return this.collaborativeFiltering(people, email);
        });
    }
    /**
     *
     * @param user
     * @returns
     */
    login(user) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            {
                return {
                    accessToken: this.jwtService.sign({ user: user.userName, email: user.email }),
                    user: user
                };
            }
        });
    }
    /**
     *
     * @param user
     * @returns Response
     */
    updateUser(user) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const users = yield this.findOne(user.oldemail);
            const item = new data_access_1.ErrorMessage;
            let response;
            if (users) {
                if (user.cellNumber) {
                    response = yield this.repoService.updateCellNumber(user.cellNumber, user.oldemail);
                }
                if (user.email) {
                    response = yield this.repoService.updateEmail(user.email, user.oldemail);
                }
                if (user.location) {
                    response = yield this.repoService.updateLocation(user.location, user.oldemail);
                }
                if (user.password) {
                    const password = yield bcrypt.hash(user.password, 10);
                    response = yield this.repoService.updatePassword(password, user.oldemail);
                }
                if (user.userName) {
                    response = yield this.repoService.updateUserName(user.userName, user.oldemail);
                }
                if (user.userSurname) {
                    response = yield this.repoService.updateUserSurname(user.userSurname, user.oldemail);
                }
                if (user.distance) {
                    response = yield this.repoService.updateDistance(user.distance, user.userSurname);
                }
                if (user.longitude) {
                    response = yield this.repoService.updateLongitude(user.longitude, user.userSurname);
                }
                if (user.latitude) {
                    response = yield this.repoService.updateLatitude(user.latitude, user.userSurname);
                }
                if (user.running) {
                    response = yield this.repoService.updateRunning(user.running, user.userSurname);
                }
                if (user.riding) {
                    response = yield this.repoService.updateRiding(user.riding, user.userSurname);
                }
                if (user.swimming) {
                    response = yield this.repoService.updateSwimming(user.swimming, user.userSurname);
                }
                if (user.weightLifting) {
                    response = yield this.repoService.updateLifting(user.weightLifting, user.userSurname);
                }
                if (user.bio) {
                    response = yield this.repoService.updateBio(user.bio, user.userSurname);
                }
                if (response) {
                    item.message = "Successful";
                    return item;
                }
                item.message = "failure";
                return item;
            }
            else {
                item.message = "failure";
                return item;
            }
        });
    }
    /**
     *
     * @param config
     * @return ErrorMessage
     */
    userConfig(config) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const val = yield this.repoService.userConfig(config);
            const item = new data_access_1.ErrorMessage;
            if (val == false) {
                item.message = "failure";
                return item;
            }
            else {
                item.message = "success";
                return item;
            }
        });
    }
    /**
     *
     * @param lat1
     * @param lon1
     * @param lat2
     * @param lon2
     * @returns distance
     */
    calculatedistance(lat1, lon1, lat2, lon2) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const R = 6371; // km
            const dLat = this.toRad(lat2 - lat1);
            const dLon = this.toRad(lon2 - lon1);
            const latone = this.toRad(lat1);
            const lattwo = this.toRad(lat2);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(latone) * Math.cos(lattwo);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const d = R * c;
            return d;
        });
    }
    /**
     *
     * @param Value
     * @returns radians
     */
    toRad(Value) {
        return Value * Math.PI / 180;
    }
    /**
     *
     * @param actLog
     * @return ErrorMessage
     */
    activityLog(actLog) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.findOne(actLog.email);
            const item = new data_access_1.ErrorMessage;
            if (!user) {
                item.message = "failure";
                return item;
            }
            else {
                yield this.repoService.logActivity(actLog);
                item.message = "success";
                return item;
            }
        });
    }
    /**
     *
     * @param userID
     * @returns
     */
    getUser(userID) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repoService.getUser(userID);
        });
    }
    /**
     *
     * @param actSchedule
     * @return ErrorMessage
     */
    activitySchedule(actSchedule) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.findOne(actSchedule.email);
            const item = new data_access_1.ErrorMessage;
            if (!user) {
                item.message = "failure";
                return item;
            }
            else {
                yield this.repoService.scheduleWorkout(actSchedule);
                item.message = "success";
                //TODO broadcast to all buddies
                return item;
            }
        });
    }
    /**
     *
     * @param userEmail
     * @param otherEmail
     * @return ErrorMessage
     */
    accept(otherEmail, userEmail) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let res = yield this.repoService.deleteConnectionRequest(userEmail, otherEmail);
            const item = new data_access_1.ErrorMessage;
            if (res === false) {
                item.message = "failure to deleteConnectionRequest";
                return item;
            }
            else {
                res = yield this.repoService.makeConnection(userEmail, otherEmail);
                item.message = "Success Connection made";
                return item;
            }
        });
    }
    /**
     *
     * @param userEmail
     * @param otherEmail
     * @return ErrorMessage
     */
    reject(otherEmail, userEmail) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const res = yield this.repoService.deleteConnectionRequest(userEmail, otherEmail);
            const item = new data_access_1.ErrorMessage;
            if (res === false) {
                item.message = "failure to deleteConnectionRequest";
                return item;
            }
            else {
                item.message = "Success User Rejected";
                return item;
            }
        });
    }
    /**
     *
     * @param userEmail
     * @param otherEmail
     * @return ErrorMessage
     */
    sendRequest(userEmail, otherEmail) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user1 = yield this.findOne(userEmail);
            const user2 = yield this.findOne(otherEmail);
            const item = new data_access_1.ErrorMessage;
            if (!user1 && !user2) {
                item.message = "failure to connect request";
                return item;
            }
            else {
                const check = yield this.getIncoming(otherEmail);
                for (let i = 0; i < check.length; i++) {
                    if (check[i].email == userEmail) {
                        item.message = "Failure Sent Request already";
                        return item;
                    }
                }
                yield this.repoService.makeConnectionRequest(userEmail, otherEmail);
                item.message = "Success User Connection Sent";
                return item;
            }
        });
    }
    /**
     *
     * @param userEmail
     * @return [ResponseLog]
     */
    getLogs(userEmail) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let arr;
            const user = yield this.findOne(userEmail);
            if (!user) {
                return arr;
            }
            else {
                arr = yield this.repoService.getLogs(userEmail);
                return arr;
            }
        });
    }
    /**
     *
     * @param userEmail
     * @return [ResponseWorkout]
     */
    getScheduleWorkout(userEmail) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let arr = [];
            const user = yield this.findOne(userEmail);
            if (!user) {
                return arr;
            }
            else {
                arr = yield this.repoService.getScheduledWorkouts(userEmail);
                return arr;
            }
        });
    }
    /**
     *
     * @param userEmail
     * @return [ResponseWorkout]
     */
    getWorkoutHistory(userEmail) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let arr = [];
            const user = yield this.findOne(userEmail);
            if (!user) {
                return arr;
            }
            else {
                arr = yield this.repoService.getWorkoutHistory(userEmail);
                return arr;
            }
        });
    }
    /**
     *
     * @param userEmail
     * @return [userEntities]
     */
    getConnections(userEmail) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.findOne(userEmail);
            const arr = [];
            if (user) {
                if (!user.buddies) {
                    return arr;
                }
                for (let i = 0; i < user.buddies.length; i++) {
                    arr.push(yield this.findOne(user.buddies[i]));
                }
                return arr;
            }
            else
                return arr;
        });
    }
    /**
     *
     * @param userEmail
     * [userEntities]
     */
    getOutgoing(userEmail) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.findOne(userEmail);
            const outgoing = [];
            if (user) {
                const arr = yield this.repoService.getOutgoingRequests(userEmail);
                if (arr.length <= 0) {
                    return arr;
                }
                for (let i = 0; i < arr.length; i++) {
                    outgoing.push(yield this.findOne(arr[i].receiver));
                }
                return outgoing;
            }
            else
                return outgoing;
        });
    }
    /**
     *
     * @param userEmail
     */
    getIncoming(userEmail) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.findOne(userEmail);
            const outgoing = [];
            if (user) {
                const arr = yield this.repoService.getIncomingRequests(userEmail);
                if (arr.length <= 0) {
                    return arr;
                }
                for (let i = 0; i < arr.length; i++) {
                    outgoing.push(yield this.findOne(arr[i].sender));
                }
                return outgoing;
            }
            else
                return outgoing;
        });
    }
    /**
     *
     * @param email
     * @param access
     * @param refresh
     * @returns ErrorMessage
     */
    saveTokens(email, access, refresh, exp, clientId, clientSecret, id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.findOne(email);
            const item = new data_access_1.ErrorMessage;
            if (!user) {
                item.message = "failure no user";
                return item;
            }
            else {
                yield this.repoService.saveTokens(email, access, refresh, exp, clientId, clientSecret, id);
                item.message = "Success User Tokens Saved ";
                return item;
            }
        });
    }
    /**
     *
     * @param email
     * @returns tokens
     */
    getToken(email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.findOne(email);
            const item = new data_access_1.ErrorMessage;
            if (!user) {
                return item;
            }
            else {
                return yield this.repoService.getTokens(email);
            }
        });
    }
    /**
     *
     * @param email
     * @param startTime
     * @returns ErrorMessage
     */
    createInvite(email, workoutID) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.findOne(email);
            const item = new data_access_1.ErrorMessage;
            if (!user) {
                item.message = "failure";
                return item;
            }
            else {
                yield this.repoService.createInvite(email, workoutID);
                item.message = "success";
                return item;
            }
        });
    }
    /**
     *
     * @param email
     * @param receiver
     * @param startTime
     * @returns ErrorMessage
     */
    sendInvite(email, receiver, workoutID) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.findOne(email);
            const item = new data_access_1.ErrorMessage;
            const arr = [];
            arr.push(receiver);
            if (!user) {
                return item;
            }
            else {
                const val = yield this.repoService.sendInvite(email, arr, workoutID);
                if (val) {
                    item.message = "Success";
                    this.sendEmail(receiver, user);
                    return item;
                }
                else {
                    item.message = "Failure";
                    return item;
                }
            }
        });
    }
    /**
     *
     * @param email
     * @param sender
     * @param startTime
     * @returns
     */
    acceptInvite(email, sender, workoutID) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.findOne(email);
            const item = new data_access_1.ErrorMessage;
            if (!user) {
                return item;
            }
            else {
                const val = yield this.repoService.acceptInvite(email, sender, workoutID);
                if (val) {
                    item.message = "Success";
                    return item;
                }
                else {
                    item.message = "Failure";
                    return item;
                }
            }
        });
    }
    /**
     *
     * @param email
     * @param sender
     * @param startTime
     * @returns
     */
    rejectInvite(email, sender, workoutID) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.findOne(email);
            const item = new data_access_1.ErrorMessage;
            if (!user) {
                return item;
            }
            else {
                const val = yield this.repoService.rejectInvite(email, sender, workoutID);
                if (val) {
                    item.message = "Success";
                    return item;
                }
                else {
                    item.message = "Failure";
                    return item;
                }
            }
        });
    }
    /**
     *
     * @param email
     * @returns
     */
    getIncomingInvites(email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.findOne(email);
            if (!user) {
                return new data_access_1.Invite;
            }
            else {
                return yield this.repoService.getIncomingInvites(email);
            }
        });
    }
    /**
     *
     * @param email
     * @returns
     */
    getOutgoingInvites(email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.findOne(email);
            if (!user) {
                return new data_access_1.Invite;
            }
            else {
                return yield this.repoService.getOutgoingInvites(email);
            }
        });
    }
    /**
     *
     * @param userEmail
     * @param startTime
     * @returns ResponseWorkout
     */
    getWorkout(userEmail, workoutID) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const arr = [];
            const user = yield this.findOne(userEmail);
            if (!user) {
                return arr;
            }
            else {
                return yield this.repoService.getWorkout(userEmail, workoutID);
            }
        });
    }
    /**
     *
     * @param dataset
     * @returns newDataset
     */
    cleanDataset(dataset) {
        const newDataset = {};
        for (const i in dataset) {
            const email = dataset[i].email;
            newDataset[email] = dataset[i].metrics;
        }
        return newDataset;
    }
    len(obj) {
        let len = 0;
        for (const i in obj) {
            len++;
        }
        return len;
    }
    pearson_correlation(dataset, p1, p2) {
        const existp1p2 = {};
        for (const item in dataset[p1]) {
            if (item in dataset[p2]) {
                existp1p2[item] = 1;
            }
        }
        const num_existence = this.len(existp1p2);
        if (num_existence == 0)
            return 0;
        let p1_sum = 0, p2_sum = 0, p1_sq_sum = 0, p2_sq_sum = 0, prod_p1p2 = 0;
        for (const item in existp1p2) {
            p1_sum += dataset[p1][item];
            p2_sum += dataset[p2][item];
            p1_sq_sum += Math.pow(dataset[p1][item], 2);
            p2_sq_sum += Math.pow(dataset[p2][item], 2);
            prod_p1p2 += dataset[p1][item] * dataset[p2][item];
        }
        const numerator = prod_p1p2 - (p1_sum * p2_sum / num_existence);
        const st1 = p1_sq_sum - Math.pow(p1_sum, 2) / num_existence;
        const st2 = p2_sq_sum - Math.pow(p2_sum, 2) / num_existence;
        const denominator = Math.sqrt(st1 * st2);
        if (denominator == 0)
            return 0;
        else {
            const val = numerator / denominator;
            recommended.push({ name: p2, value: val });
            return val;
        }
    }
    getRecommendations(dataset, person) {
        const totals = {};
        const simSums = {};
        for (const other in dataset) {
            if (other == person)
                continue;
            const sim = this.pearson_correlation(dataset, person, other);
            if (sim <= 0)
                continue;
            for (const item in dataset[other]) {
                if (item in dataset[person])
                    continue;
                totals[item] = totals[item] || 0;
                totals[item] += dataset[other][item] * sim;
                simSums[item] = simSums[item] || 0;
                simSums[item] += sim;
            }
        }
        const rankings = [];
        for (const item in totals) {
            rankings.push([totals[item], item]);
        }
        rankings.sort();
        rankings.reverse();
        return rankings;
    }
    getFullDatasetFromRecommended(dataset, recommended, email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const newDataset = [];
            const person = yield this.findOne(email);
            recommended.forEach(i => {
                if (i.value > 0.50 || i.value < -0.50) {
                    dataset.forEach(element => {
                        if (element.email == i.name) {
                            if (!this.contains(person.buddies, element.email) && element.email != email) {
                                newDataset.push(element);
                            }
                        }
                    });
                }
            });
            return newDataset;
        });
    }
    contains(arr, email) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == email) {
                return true;
            }
        }
        return false;
    }
    sortRecommended(recommended) {
        recommended.sort(function (a, b) {
            return b.value - a.value;
        });
        return recommended;
    }
    collaborativeFiltering(people, email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (people.length <= 0) {
                return people;
            }
            recommended = [];
            this.getRecommendations(this.cleanDataset(people), email);
            this.sortRecommended(recommended);
            const newset = yield this.getFullDatasetFromRecommended(people, recommended, email);
            if (newset.length <= 0) {
                const val = this.removeUser(people, email);
                return val;
            }
            return newset;
        });
    }
    removeUser(dataset, email) {
        const newDataset = [];
        dataset.forEach(element => {
            if (element.email != email) {
                newDataset.push(element);
            }
        });
        return newDataset;
    }
    /**
    *
    * @param workoutID
    * @returns ErrorMessage
    */
    completeWorkout(workoutID, email) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const val = yield this.repoService.completeWorkout(workoutID, email);
            const item = new data_access_1.ErrorMessage;
            if (val == null) {
                item.message = "failure";
                return item;
            }
            else {
                item.message = "success";
                return item;
            }
        });
    }
    addRating(userEmail, rating) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const val = yield this.repoService.addRating(userEmail, rating);
            const item = new data_access_1.ErrorMessage;
            if (val == false) {
                item.message = "failure";
                return item;
            }
            else {
                item.message = "success";
                return item;
            }
        });
    }
};
TrainingBuddyServiceService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof data_access_2.ApiInternalApiRepositoryDataAccessService !== "undefined" && data_access_2.ApiInternalApiRepositoryDataAccessService) === "function" ? _b : Object, typeof (_c = typeof data_access_1.UserEntity !== "undefined" && data_access_1.UserEntity) === "function" ? _c : Object])
], TrainingBuddyServiceService);
exports.TrainingBuddyServiceService = TrainingBuddyServiceService;


/***/ }),

/***/ "./libs/api/shell/feature/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/api/shell/feature/src/lib/api-shell-feature.module.ts"), exports);


/***/ }),

/***/ "./libs/api/shell/feature/src/lib/api-shell-feature.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiShellFeatureModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const feature_1 = __webpack_require__("./libs/api/example/api/feature/src/index.ts");
const training_buddy_api_1 = __webpack_require__("./libs/api/internal-api/api/training-buddy-api/src/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const apollo_1 = __webpack_require__("@nestjs/apollo");
let ApiShellFeatureModule = class ApiShellFeatureModule {
};
ApiShellFeatureModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            feature_1.FeatureModule,
            training_buddy_api_1.ApiInternalApiApiTrainingBuddyApiModule,
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: true,
                driver: apollo_1.ApolloDriver,
                installSubscriptionHandlers: true,
                subscriptions: {
                    'graphql-ws': true,
                    'subscriptions-transport-ws': true
                },
            }),
        ],
    })
], ApiShellFeatureModule);
exports.ApiShellFeatureModule = ApiShellFeatureModule;


/***/ }),

/***/ "@nestjs/apollo":
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/graphql":
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/platform-express":
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "axios":
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "cors":
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "firebase-admin":
/***/ ((module) => {

module.exports = require("firebase-admin");

/***/ }),

/***/ "firebase-functions":
/***/ ((module) => {

module.exports = require("firebase-functions");

/***/ }),

/***/ "graphql-subscriptions":
/***/ ((module) => {

module.exports = require("graphql-subscriptions");

/***/ }),

/***/ "js-sha256":
/***/ ((module) => {

module.exports = require("js-sha256");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "rxjs":
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "sib-api-v3-sdk":
/***/ ((module) => {

module.exports = require("sib-api-v3-sdk");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "uuid":
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "./apps/api/src/training-buddy-2022-firebase-adminsdk-uine6-59d810bb2a.json":
/***/ ((module) => {

module.exports = JSON.parse('{"apiKey":"AIzaSyD_61N0OLPsfAKHoawzDtIExK_BU3GR6hM","type":"service_account","project_id":"training-buddy-2022","private_key_id":"59d810bb2ae9bb240e9ad592a48ceb3085bebaaa","private_key":"-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCuZBfG00kSwX7t\\nVw6iALIFGskNDZYxPI4KJcGuRuZstEuMzZNeqd+k0RVmwrNG+pJQDp4N2/8+kIcv\\nmZd6WEw7bwUbG+OfYpwAqu3sdtLbuNRIobXP9Hl4FjCbe+ELUVEaAm6aMsfp1t5o\\nZ+szzJ6Oe+dvAJVnbh9ZYvqGPMgKd8KFZnNYW0NsAaN9b2sAHfcODYbY7OcPKpt7\\nPK+3S9y93vEH8iQDIi1EYk2Nvef3WT334ATnPGERklG2BCSxsj4NLLzPjh7AQCD0\\nzf7mZjS8DkSRMCBj3Bh/qkGXPF7DjKZpgK6Q81R2QFrKBqoTanZUQo+4IaHsvtk5\\nisPbE6QVAgMBAAECggEAFSBsHvquwhZt7Yvb6nViG6s0ix/Hv7xByunrDlVpiebH\\ntk2bWl8DCIEJ8jKJLIKjog47SJuLzwUMU5BsYPZ8ecDH4hJdX4w/MPeELl7wyYyZ\\nLxlkIMbRxmINznBSAaB+zkNYKdcYD/SnageY32QdG07YaUKtVuPo6VfL2OJZK6dG\\nSNSfisYfKrgI6MKSMeXkUXwrINJRVv5H7yNe/d+eQ3GBA1furYQwS9TTQfvPQ6RZ\\nmeTzUoDb8vnU0jdDSmdJ2bjspIiVWyyRkRuVOEKO/9THtGr+s4aHOTJ73ySZSLyU\\nbAeO2AtO9uKYOwLC029SMPqaKaAuPVATWDKNyjL+0QKBgQDdxW/ak2Hkay4VFAxP\\nYwOPZ/Ycnh7exHznPvw0DmhhbPYJ4wcFs+WCCayf7d08HJxHiiwxnTFwG1jSnqux\\nKyp0Rgzv1JsTTmAcTsVLv1+OMURx2kFCq2SmF1vEZ52lPibDpXeNo+tCGXUkknp8\\nv18douJPIo3+JSqAoiu6onporQKBgQDJTpStIn35z6HEhgESaLhgaf1HFZCeaLWz\\n7oCMIOFp5wMqu3NZE1ktr/HDAiN4+agDLE9tWg/kaHzcQh1AWWLxAIqpQWUYQOIK\\nsEhe78Rlr+yc8QvRNZTYYzBznyLlAdj1fvQwuNsn4QYeGF43/qRKgxSaiYnoDmB1\\n7KSzAk6OCQKBgQDGxjGEczd52ctbHzYNbc0CG4ePjPZUaz8cseqx6fwK3vQEVpWz\\nudPLY0pzqmrydx5oTONhsOhf+FL7rTZsvSj3QNZVnHVGr6gbl0rloulN9MDJX3vA\\n+whiims5NjopovRxxfzLWpICE/lYR2Y8K/dgA9/eWDV3Bu76juCtDvaynQKBgQCZ\\nOGBdbzVnYKwGAuDp/B7p84I+CqHqkFRMwanB/nzTuGtmqQpgsCNebN6cyRHq0Esb\\nLyy9VKFn/kea9g+BnQd73CeuMAIcdbYW4JoU+HYJ199GjQmrkRbbpJOKTYOnvsI+\\nCQUf2HOmZNXdLjr4b67or+CMx0baA6dT2mx5e7YC0QKBgAMj7vEz6WtaX9ccN3A4\\nhFe+T42j94O6W/XFWv8Ww71NC/W++hlkEYiv9oTsXuokqRQK2KEFmV+kUMF8Z0uk\\nvvT2TDUlQ5lv1XqRd9nJNGP+847vN0q1EW7SMnpI9q9/nF3WaGvgDpHuB+rcdrU1\\n1OehlObgVZ5ML08EBKlban4L\\n-----END PRIVATE KEY-----\\n","client_email":"firebase-adminsdk-uine6@training-buddy-2022.iam.gserviceaccount.com","client_id":"112164416955209047586","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uine6%40training-buddy-2022.iam.gserviceaccount.com"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./apps/api/src/main.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map