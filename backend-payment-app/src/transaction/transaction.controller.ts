import { Controller, HttpService } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { EventPattern } from '@nestjs/microservices';
import { Order } from './entities/Order';
import { PaymentOrderStatusMapping, PaymentStatusEnum } from '../enums/enums';
import { ConfigService } from '@nestjs/config';

@Controller('transactions')
export class TransactionController {
  constructor(
    private transactionService: TransactionService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  @EventPattern('order_created')
  async create(order: Order) {
    const newTransaction = await this.transactionService.create(order);
    const status =
      newTransaction.status === PaymentStatusEnum.DECLINED
        ? PaymentOrderStatusMapping.get(PaymentStatusEnum.DECLINED)
        : PaymentOrderStatusMapping.get(PaymentStatusEnum.CONFIRMED);
    this.httpService
      .patch(
        `${this.configService.get<string>(
          'ORDER_APP_ENDPOINT_DEVELOPMENT',
        )}/order-payment/${order.id}`,
        {
          status,
          pin: newTransaction.pin,
        },
      )
      .toPromise()
      .then(() => console.log("Update order's status successfully"))
      .catch((error) =>
        console.log("Error happened while updating order's status: ", error),
      );
  }
}
