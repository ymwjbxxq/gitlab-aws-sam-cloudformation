# Migrate from serverless to AWS SAM/CloudFormation #

Previously I posted a serverless file to build this

![picture](https://bitbucket.org/DanBranch/api-sns-sqs-lambda/downloads/diagram.png)

Today I will share a bit more code just to let you understand the structure of the solution and how I migrated from serverless framework to AWS SAM/CloudFormation with all my open points.

### Why migrate? ###

Because often I am blocked for some plugin limitation or bugs and so on, I wanted to have more flexibility and at the end of the day I wanted to play around with AWS SAM to see if it something to consider.

### Structure ###

The structure of the project is very simple

![picture](https://bitbucket.org/DanBranch/gitlab-aws-sam-cloudformation/downloads/Structure.png)

In the root, you have the ci configuration in this case GitLab.

The **skeleton** folder is where I like to group the resources for the overall service like security groups, the deployment bucket etc
In this example, I have 2 files and I am sure that I did something wrong but please stay with me.
If you are using a serverless framework like in this [example](https://bitbucket.org/DanBranch/api-sns-sqs-lambda/src/master/) you will know that you will end up with 1 CloudFormation stack with 2 buckets:

*  Random generated that contain the template of the “deployment bucket”
*  Deployment bucket that you will reference all around

I tried to do the same, but I end up with 2 stacks, but I am sure I will find a way, after all, I did this migration watching the final of the champions league.

The **API-gateways** folder contains the lambda of your endpoint. If you expose GET and POST for example you will have 2 lambdas there one for each HTTP method.

The **lambdas** folder contains lambda functions that are belonging to the service

Each lambda function contains the SAM template and the webpack.config that is used to bundle and zip the function.

### Doubs ###

1.  Every time that I do a deploy it add 2 new files (0b7efb6757e85744681e10d43f61389e and 0b7efb6757e85744681e10d43f61389e.template) and so after a while the bucket is full, cannot find the way to keep only the last deployment
2.  Could not find a way to deploy multiple lambda functions with one AWS SAM template even if I use CodeUri point to commonfolder/my.zip, so I guess I need more investigation here
3.  I have used a lot of pure CloudFormation where I could not find a way with AWS SAM to mix feelings, but I guess this is the flexibility that I was looking for.
