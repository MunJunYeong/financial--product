import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as swaggerUi from 'swagger-ui-express';
import * as yaml from 'js-yaml';

export class SwaggerConfig {
    static setupSwagger(app: INestApplication) {
        const config = new DocumentBuilder()
            .setTitle('Auth API')
            .setDescription('Auth API description for 8087')
            .setVersion('1.0.0')
            .build();

        const document = SwaggerModule.createDocument(app, config);

        // Convert JSON to YAML
        const yamlDocument = yaml.dump(document);

        app.use('/api-yaml', (req, res) => {
            res.setHeader('Content-Type', 'text/yaml');
            res.send(yamlDocument);
        });

        const swaggerOptions = {
            explorer: true,
            swaggerOptions: {
                urls: [
                    { url: '/api-yaml', name: 'Auth' },
                    { url: 'http://localhost:8088/api-yaml', name: 'Calculate' },
                    { url: 'http://localhost:8089/api-yaml', name: 'Product' },
                ],
            },
        };

        app.use('/api', swaggerUi.serve, swaggerUi.setup(undefined, swaggerOptions));
    }
}