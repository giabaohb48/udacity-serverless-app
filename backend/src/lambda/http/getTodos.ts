import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
// import * as middy from 'middy'
// import { cors } from 'middy/middlewares'
import {getAllToDo} from "../../businessLogic/ToDo";

// import { getTodosForUser as getTodosForUser } from '../../businessLogic/ToDo'
// import { getUserId } from '../utils';

// TODO: Get all TODO items for a current user
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    console.log("Processing Event ", event);
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];
    const todos = await getAllToDo(jwtToken);

    return {
      statusCode: 200,
      headers: {
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        "items":  todos
      })
  }
}