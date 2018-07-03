//
//  NoteModel.h
//  cloud-notes-ios
//
//  Created by Immanuel Amirtharaj on 7/2/18.
//  Copyright © 2018 Immanuel Amirtharaj. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NoteModel : NSObject

@property(copy, nonatomic) NSString *title;
@property(copy, nonatomic) NSDate *createdAt;
@property(copy, nonatomic) NSString *fileUrl;

-(instancetype) initWithDictionary: (NSDictionary *)noteObject;


@end
