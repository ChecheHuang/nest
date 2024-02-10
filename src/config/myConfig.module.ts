import { DynamicModule, Global, Module } from '@nestjs/common'

@Global()
@Module({})
export class MyConfigModule {
  static forRoot(options: { path: string }): DynamicModule {
    return {
      module: MyConfigModule,
      providers: [
        {
          provide: 'MyConfigModule',
          useValue: {
            baseUrl: '/api' + options.path,
          },
        },
      ],
      exports: ['MyConfigModule'],
    }
  }
}
