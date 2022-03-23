import {
  OwnershipTransferred as OwnershipTransferredEvent,
  UserDeposited as UserDepositedEvent,
  UserWithdrawed as UserWithdrawedEvent
} from "../generated/ETHPoolManager/ETHPoolManager"
import {
  OwnershipTransferred,
  UserDeposited,
  UserWithdrawed
} from "../generated/schema"

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner
  entity.save()
}

export function handleUserDeposited(event: UserDepositedEvent): void {
  let entity = new UserDeposited(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.account = event.params.account
  entity.amount = event.params.amount
  entity.save()
}

export function handleUserWithdrawed(event: UserWithdrawedEvent): void {
  let entity = new UserWithdrawed(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.account = event.params.account
  entity.amount = event.params.amount
  entity.save()
}
