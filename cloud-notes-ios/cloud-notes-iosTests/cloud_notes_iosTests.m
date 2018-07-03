//
//  cloud_notes_iosTests.m
//  cloud-notes-iosTests
//
//  Created by Immanuel Amirtharaj on 7/1/18.
//  Copyright © 2018 Immanuel Amirtharaj. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "NoteService.h"

@interface cloud_notes_iosTests : XCTestCase

@end

@implementation cloud_notes_iosTests

- (void)setUp {
    [super setUp];
    // Put setup code here. This method is called before the invocation of each test method in the class.
    
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
}

- (void)testExample {
    // This is an example of a functional test case.
    // Use XCTAssert and related functions to verify your tests produce the correct results.
    
    [NoteService getCategories:^(NSMutableArray * categoryList) {
        NSLog(@"%@", categoryList);
    }];
    
    [NoteService getNotesForCategory:@"big-data" completion:^(NSMutableArray * noteList) {
        NSLog(@"%@", noteList);
    }];
}

- (void)testPerformanceExample {
    // This is an example of a performance test case.
    [self measureBlock:^{
        // Put the code you want to measure the time of here.
    }];
}

@end
