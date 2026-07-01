function getCustomersWithNoItems(requests, totalInventory) {
  // 记录每个 customer 有没有拿到过 item
  const received = new Map(), i = 0, result = [];

  for (const [customerId] of requests) { received.set(customerId, false); }

  // 先按 bidAmount 降序，再按 timestamp 升序
  requests.sort((a, b) => {
    const bidA = a[2], bidB = b[2], timeA = a[3], timeB = b[3];
    if (bidA !== bidB) { return bidB - bidA; }
    return timeA - timeB;
  });

  while (i < requests.length && totalInventory > 0) {
    const currentBid = requests[i][2], group = [];

    while (i < requests.length && requests[i][2] === currentBid) {
      const [customerId, quantity, bidAmount, timestamp] = requests[i];
      // 相同 bid 的人 group 起来
      group.push({ customerId, remaining: quantity, bidAmount, timestamp });
      i++;
    }

    // 对当前 bidAmount 这一组做 round-robin
    let hasActiveCustomer = true;
    while (totalInventory > 0 && hasActiveCustomer) {
      hasActiveCustomer = false;

      for (const request of group) {
        if (totalInventory === 0) break;

        if (request.remaining > 0) {
          request.remaining -= 1;
          totalInventory -= 1;
          received.set(request.customerId, true);
          hasActiveCustomer = true;
        }
      }
    }
  }

  for (const [customerId, hasReceived] of received.entries()) {
    !hasReceived && result.push(customerId);
  }

  return result;
}