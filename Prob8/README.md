# Problem 8

Create a subgraph that index users of the contract from the first challenge into entities as you see convenient. For example, it would be great to query all user deposits to the pool. You can be creative and add other information that you find relevant.

https://thegraph.com/docs/quick-start

# Solution
## Time
50 mins

## How to test

Please check using this url:

https://api.thegraph.com/subgraphs/name/blockchaincrazy95/ethpoolmanager-subgraph000/graphql

Sample Query:

```
{
  userDepositeds(first: 5) {
    account
    amount
  }
  userWithdraweds(first: 5) {
    account
    amount
  }
}
```
Sample Result:
```
{
  "data": {
    "userDepositeds": [
      {
        "account": "0xf235710d1a70272a274da1c3146f16302219c6d3",
        "amount": "100000000000000000"
      },
      {
        "account": "0x484020c219a945acb104184b026d58651dbf833a",
        "amount": "200000000000000000"
      },
      {
        "account": "0x3e5cc534379e3887f42bb4b58d138dac49d85324",
        "amount": "100000000000000000"
      }
    ],
    "userWithdraweds": [
      {
        "account": "0x3e5cc534379e3887f42bb4b58d138dac49d85324",
        "amount": "100000000000000000"
      }
    ]
  }
}
```

This is the event used in ETHPoolManager contract:
```
/*
    account: Depositing user, amount: deposit amount
*/
event UserDeposited(address account, uint256 amount);
/* 
    account: withdrawing user,
    amount: reward amount(except deposited balance)
*/
event UserWithdrawed(address account, uint256 amount);
```
