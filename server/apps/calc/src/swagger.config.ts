import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as yaml from 'js-yaml';

export class SwaggerConfig {
    private document: any;

    constructor(private readonly app: INestApplication) {}

    public initialize(): void {
        const config = new DocumentBuilder()
            .setTitle('Calculate API')
            .setDescription('적금 금리, 선납이연 계산기 API description')
            .setVersion('1.0.0')
            .build();

        this.document = SwaggerModule.createDocument(this.app, config);
    }

    public serveUI(path: string): void {
        SwaggerModule.setup(path, this.app, this.document);
    }

    public serveYaml(path: string): void {
        this.app.use(path, (req, res) => {
            const yamlDocument = yaml.dump(this.document);
            res.setHeader('Content-Type', 'text/yaml');
            res.send(yamlDocument);
        });
    }
}
