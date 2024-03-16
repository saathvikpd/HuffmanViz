import PriorityQueue from '../src/lib/modules/PriorityQueue';

describe('PriorityQueue', () => {
  let pq;

  beforeEach(() => {
    pq = new PriorityQueue();
  });

  test('is initially empty', () => {
    expect(pq.isEmpty()).toBe(true);
  });

  test('inserts items correctly and maintains order', () => {
    pq.insert({character: 'a', frequency: 3});
    pq.insert({character: 'b', frequency: 1});
    pq.insert({character: 'c', frequency: 2});

    // PriorityQueue should order items based on frequency
    expect(pq.extractMin()).toEqual({character: 'b', frequency: 1});
    expect(pq.extractMin()).toEqual({character: 'c', frequency: 2});
    expect(pq.extractMin()).toEqual({character: 'a', frequency: 3});
    expect(pq.isEmpty()).toBe(true);
  });

  test('peek returns the item with the lowest frequency without removing it', () => {
    pq.insert({character: 'a', frequency: 3});
    pq.insert({character: 'b', frequency: 1});

    expect(pq.peek()).toEqual({character: 'b', frequency: 1});
    expect(pq.isEmpty()).toBe(false); // The queue should still contain the items
  });
});
