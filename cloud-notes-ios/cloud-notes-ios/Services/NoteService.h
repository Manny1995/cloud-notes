//
//  NoteService.h
//  cloud-notes-ios
//
//  Created by Immanuel Amirtharaj on 7/2/18.
//  Copyright © 2018 Immanuel Amirtharaj. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "CategoryModel.h"
#import "NoteModel.h"

@interface NoteService : NSObject

+ (void) getCategories: (void(^)(NSMutableArray *))completion;
+ (void) getNotesForCategory: (NSString *)categoryId completion:(void(^)(NSMutableArray *)) completionBlock;

@end
