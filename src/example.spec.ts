class FriendList {
    friends = [];
    addFriend(name) {
        this.friends.push(name);
        this.announceFriendship(name);
    }

    announceFriendship(name) {
        global.console.log(`${name} is now a friend!`);
    }

    removeFriend(name) {
        const idx = this.friends.indexOf(name);
        if (idx === -1) {
            throw new Error('Friend not found!');
        }
        this.friends.splice(idx, 1);
    }

}

describe('FriendList', () => {

    let friendList;
    beforeEach(() => {
        friendList = new FriendList();
    });

    it('Initializes friends list ', () => {
        expect(friendList.friends.length).toEqual(0);
    });

    it('adds a friend to the list', () => {
        friendList.addFriend('Bryan');
        expect(friendList.friends.length).toEqual(1);
    });

    it('Announces friendship', () => {
        friendList.announceFriendship = jest.fn();
        expect(friendList.announceFriendship).not.toHaveBeenCalled();
        friendList.addFriend('Bryan');
        expect(friendList.announceFriendship).toHaveBeenCalledWith('Bryan');
    });

    describe('removeFriend', () => {

        it('removes a friend from the list', () => {
            friendList.addFriend('Bryan');
            expect(friendList.friends[0]).toEqual('Bryan');
            friendList.removeFriend('Bryan');
            expect(friendList.friends[0]).toBeUndefined();
        });

        it('throws an error as friend does not exist', () => {
            expect(() => friendList.removeFriend('Bryan')).toThrow();
        });

    });

});
